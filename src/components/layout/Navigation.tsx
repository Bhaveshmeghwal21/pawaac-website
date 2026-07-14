"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

// Spec: pawaac-design-language-evolution, Task 57 (supersedes Task 17)
// Requirements: 1.1, 1.5, 1.6
// Design: design.md -> Shared Components -> Header / Navigation
//
// Exactly 4 primary items, in this order, pointing to real Pawaac_Site
// routes/dropdowns. Deployments was removed from primary Navigation (moved
// to Footer-only, task 58, Requirement 1.8); Planner moved from a primary
// item into the new Resources dropdown below.
//
// "Product" carries a dropdown exposing the 4 product lines. The 4th line
// is named "HawkAI" (site owner has finalized the name; previously
// "Quadcopter (name pending)").
const PRODUCT_SUBLINKS = [
  { label: "Software Stack", href: "/product/software-stack" },
  { label: "Docking System", href: "/product/docking-system" },
  { label: "Sentrivion", href: "/product/sentrivion" },
  { label: "HawkAI", href: "/product/hawkai" },
];

// Resources_Menu dropdown contents, in order (Requirement 1.1, design.md ->
// Header / Navigation). "Log Analyser" is the sole external destination and
// carries the same External_Link_Marker treatment as Footer's external
// links (Requirement 2.3's marker pattern), applied here too.
const RESOURCES_SUBLINKS = [
  { label: "Planner", href: "/designer" },
  {
    label: "Log Analyser",
    href: "https://analyse.bajrangdrone.tech",
    external: true,
  },
  { label: "News", href: "/news" },
  { label: "Our Commitments", href: "/commitments" },
];

// Routes that drive the Resources active-item indicator (Requirement
// 1.5–1.6, Correctness Property 14). Analyser is external and therefore
// cannot itself be "the current page", so it is intentionally excluded.
const RESOURCES_ACTIVE_ROUTES = ["/designer", "/news", "/commitments"];

// Company_Menu dropdown contents, in order (site-owner request: "no
// careers page, about us, contact us page in ... Company section ... make
// company as dropdown and put these under that"). Company keeps
// href="/company" so the "Company" label itself still navigates to the
// existing Company_Page — following the exact same both-link-AND-trigger
// pattern already used for Product. The first child, "About Us", is an
// intentional duplicate destination of the trigger itself (the same
// convention many sites use: the top-level label and its first dropdown
// entry both resolve to the same About/company page), while Careers and
// Contact Us surface the two previously Footer-only pages directly from
// primary Navigation.
const COMPANY_SUBLINKS = [
  { label: "About Us", href: "/company" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

// Routes that drive the Company active-item indicator (Requirement
// 1.5–1.6, Correctness Property 14), mirroring RESOURCES_ACTIVE_ROUTES:
// Company now shows active on its own page as well as on either of its
// two dropdown-only destinations, Careers_Page and Contact_Page.
const COMPANY_ACTIVE_ROUTES = ["/company", "/careers", "/contact"];

type SubLink = {
  label: string;
  href: string;
  external?: boolean;
};

// Resources has no own route — it is purely a Label_Caps dropdown trigger
// (design.md -> Header / Navigation: "each a Label_Caps link or, for
// Resources, a Label_Caps dropdown trigger"), unlike Product and Company,
// which are both a real link AND a dropdown trigger. `href` is therefore
// intentionally omitted for Resources; the trigger renders as a <button>
// rather than an <a> below.
const LINKS: {
  label: string;
  href?: string;
  children?: SubLink[];
}[] = [
  { label: "Product", href: "/product", children: PRODUCT_SUBLINKS },
  { label: "Autonomy", href: "/autonomy" },
  { label: "Resources", children: RESOURCES_SUBLINKS },
  { label: "Company", href: "/company", children: COMPANY_SUBLINKS },
];

// External_Link_Marker (Requirement 2.3's marker pattern, reused here per
// design.md's Header / Navigation section): a small monochrome
// diagonal-arrow glyph (aria-hidden="true") immediately followed by
// visually-hidden text "(opens external site)", matching Footer.tsx's
// ExternalLinkMarker exactly.
function ExternalLinkMarker() {
  return (
    <>
      {" "}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens external site)</span>
    </>
  );
}

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
            // Product and Autonomy are active only on an exact route match
            // to their own page. Resources has no own route, so it instead
            // shows active whenever the current route is one of the three
            // Resources_Menu-linked internal routes (/designer, /news,
            // /commitments) — Analyser is external and cannot itself be
            // "the current page", so it does not drive the indicator.
            // Company mirrors that same pattern: it shows active on its
            // own page (/company) as well as on either of its two
            // Company_Menu-linked routes, /careers and /contact, since
            // those pages are now also reachable from the Company
            // dropdown. No item is active on Homepage ("/") or any other
            // non-matching route (Deployments_Page has been removed
            // entirely — task 65).
            const isResourcesActive = RESOURCES_ACTIVE_ROUTES.includes(
              pathname ?? "",
            );
            const isCompanyActive = COMPANY_ACTIVE_ROUTES.includes(
              pathname ?? "",
            );
            const isActive =
              l.label === "Resources"
                ? isResourcesActive
                : l.label === "Company"
                  ? isCompanyActive
                  : pathname === l.href;
            const hasChildren = !!l.children?.length;
            const TriggerTag: "a" | "button" = l.href ? "a" : "button";

            return (
              <li key={l.label} className={hasChildren ? "group/nav relative" : ""}>
                <TriggerTag
                  {...(l.href
                    ? { href: l.href }
                    : { type: "button" as const })}
                  aria-current={isActive ? "page" : undefined}
                  aria-haspopup={hasChildren ? "true" : undefined}
                  aria-expanded={hasChildren ? "false" : undefined}
                  className={`label group relative flex items-center gap-1.5 transition-colors hover:text-fg ${
                    isActive ? "text-fg" : "text-muted"
                  }`}
                >
                  {l.label}
                  {hasChildren && (
                    <span
                      aria-hidden="true"
                      className="mt-px inline-block text-[9px] transition-transform duration-200 group-hover/nav:rotate-180"
                    >
                      ▾
                    </span>
                  )}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-interactive transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </TriggerTag>

                {hasChildren && (
                  <ul
                    className="invisible absolute left-0 top-full z-[91] mt-2 w-56 border border-line bg-black/95 py-2 opacity-0 backdrop-blur-[16px] transition-opacity duration-200 group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100"
                  >
                    {l.children!.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          {...(child.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="label block px-4 py-2.5 text-muted transition-colors hover:text-fg"
                        >
                          {child.label}
                          {child.external && <ExternalLinkMarker />}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
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
            {LINKS.map((l, i) =>
              l.href ? (
                <div key={l.label} className="flex flex-col items-center gap-3">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="font-display text-3xl font-semibold text-fg"
                  >
                    {l.label}
                  </motion.a>
                  {l.children?.map((child) => (
                    <motion.a
                      key={child.href}
                      href={child.href}
                      {...(child.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.03 }}
                      className="label text-muted"
                    >
                      {child.label}
                      {child.external && <ExternalLinkMarker />}
                    </motion.a>
                  ))}
                </div>
              ) : (
                // Resources has no own route (design.md: "a Label_Caps
                // dropdown trigger" rather than a link) — the mobile menu
                // renders its label as static (non-navigating) text
                // heading above its children, mirroring how Product's
                // dropdown appears in the mobile menu otherwise.
                <div key={l.label} className="flex flex-col items-center gap-3">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="font-display text-3xl font-semibold text-fg"
                  >
                    {l.label}
                  </motion.span>
                  {l.children?.map((child) => (
                    <motion.a
                      key={child.href}
                      href={child.href}
                      {...(child.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.03 }}
                      className="label text-muted"
                    >
                      {child.label}
                      {child.external && <ExternalLinkMarker />}
                    </motion.a>
                  ))}
                </div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
