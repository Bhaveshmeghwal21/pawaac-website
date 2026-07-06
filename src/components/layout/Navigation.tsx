"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

// Spec: pawaac-design-language-evolution, Task 17
// Requirements: 1.1
// Design: design.md -> Shared Components -> Header / Navigation
//
// Exactly 5 primary items, in this order, pointing to real Pawaac_Site
// routes (replacing the previous in-page anchor LINKS array).
const LINKS = [
  { label: "Product", href: "/product" },
  { label: "Autonomy", href: "/autonomy" },
  { label: "Deployments", href: "/deployments" },
  { label: "Planner", href: "/designer" },
  { label: "Company", href: "/company" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Requirements: 1.5, 1.6 / Design: Header / Navigation
    // Scroll threshold refined from 50px -> 24px to match design.md's
    // "transparent at scroll 0, transitioning ... once scrolled > 24px".
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-300 ${
        scrolled
          ? "bg-black/72 backdrop-blur-[16px] border-b border-line"
          : "bg-transparent"
      }`}
    >
      {/*
        Skip-to-content link (Requirement 10.5): first focusable element in
        the render tree, visually hidden until focused, moves focus to the
        <main id="main-content"> wrapper set in src/app/layout.tsx.
      */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.1em] focus:text-bg"
      >
        Skip to content
      </a>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 text-fg">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-bold tracking-tight text-fg">
            PAWAAC
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            // Requirements: 1.5, 1.6 / Design: Header / Navigation ->
            // Active-item indicator, Correctness Property 14.
            // Active iff the current route exactly matches this item's
            // route; no item is active on Homepage ("/"), Contact_Page
            // ("/contact"), Careers_Page ("/careers"), or any other
            // non-matching route.
            const isActive = pathname === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`label group relative transition-colors hover:text-fg ${
                    isActive ? "text-fg" : "text-muted"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-interactive transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="/contact"
          className="hidden border border-fg px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg md:block"
        >
          Request Demo
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-fg" />
          <span className="h-px w-6 bg-fg" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-8 bg-bg md:hidden"
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-5 font-mono text-sm text-muted"
            >
              CLOSE ✕
            </button>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="font-display text-3xl font-semibold text-fg"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
