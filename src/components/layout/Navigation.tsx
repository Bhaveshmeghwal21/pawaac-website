"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

const LINKS = [
  { label: "Technology", href: "/#technology" },
  { label: "Vision AI", href: "/#vision-ai" },
  { label: "Deployments", href: "/#deployments" },
  { label: "Planner", href: "/designer" },
  { label: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/#top" className="flex items-center gap-2.5 text-fg">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-bold tracking-tight text-fg">
            PAWAAC
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[13px] font-medium text-muted transition-colors hover:text-fg"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden border border-red px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-red transition-colors hover:bg-red hover:text-white md:block"
        >
          Schedule Demo
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
