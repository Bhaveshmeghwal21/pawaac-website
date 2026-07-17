"use client";

import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

// Spec: pawaac-design-language-evolution, Task 18
// Requirements: 1.3, 1.4, 2.1, 2.2, 2.3
// Design: design.md -> Shared Components -> Footer; Correctness Property 13
//
// External_Link_Marker: a small monochrome diagonal-arrow glyph
// (aria-hidden="true") immediately followed by visually-hidden text
// "(opens external site)", which becomes part of the link's accessible name.
// Rendered only on external links (Corporate_Site, Analyser) — never on
// internal links (Requirement 2.3, Property 13: markerRendered === isExternal).
function ExternalLinkMarker() {
  return (
    <>
      {" "}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens external site)</span>
    </>
  );
}

// Internal footer nav mirror — replaces the previous in-page anchor LINKS
// (#technology, #vision-ai, #deployments, #contact) with real routes
// consistent with the primary Navigation (task 17). Careers and Contact are
// required by Requirements 1.3/1.4; Product/Autonomy/Company are kept for a
// fuller internal nav mirror, consistent with design.md's mention of
// "nav mirrors if repeated in-footer."
//
// Spec: pawaac-design-language-evolution, Task 65
// Design: design.md -> Shared Components -> Footer (Deployments_Page removed)
//
// "Deployments" link removed — Deployments_Page has been removed entirely
// (task 65), so this is no longer a valid internal route.
const INTERNAL_LINKS: { label: string; href: string }[] = [
  { label: "Product", href: "/product" },
  { label: "Autonomy", href: "/autonomy" },
  { label: "Company", href: "/company" },
  // Requirement 1.3: Careers link -> Careers_Page (task 15)
  { label: "Careers", href: "/careers" },
  // Requirement 1.4: "Contact" link -> Contact_Page (task 14)
  { label: "Contact", href: "/contact" },
];

// External links (Requirement 2.1, 2.2): Corporate_Site and Analyser.
// Corporate_Site link text names "Bajrang Dronetech Pvt Ltd" and never
// contains "PAWAAC" in any casing. Analyser link text includes "Beta".
const EXTERNAL_LINKS: { label: string; href: string }[] = [
  { label: "Bajrang Dronetech Pvt Ltd", href: "https://bajrangdrone.tech" },
  { label: "Pawaac Analyser (Beta)", href: "https://analyse.bajrangdrone.tech" },
];

// Site-owner request (current session): a three-column layout and an
// oversized "PAWAAC" wordmark bar are added to this Footer, ported from an
// earlier/sibling build of this same site
// (D:\LionXdrones\website\pawaac-website\src\components\layout\Footer.tsx)
// that the site owner pointed to as the reference for "the bottom-most
// part" of the homepage. That sibling file's link data/labels are NOT used
// here — this Footer's own INTERNAL_LINKS/EXTERNAL_LINKS/badges/address
// above are kept as the single source of truth (they're the ones covered
// by Footer.test.tsx) — only the richer three-column layout and the
// oversized wordmark bar treatment are ported over. The sibling's closing
// mission-statement line ("Coverage that stays on watch, so critical
// sites never go dark.") was tried here too but removed per a later
// site-owner request — the first column now holds only the logo/wordmark.
//
// Motion follow-up (site-owner request): the whileInView fade/rise
// entrance originally applied to all three content columns (mission
// statement, nav, contact) as well as the wordmark. Per feedback, that
// motion should apply ONLY to the oversized "PAWAAC" wordmark — the three
// columns above now render as plain, static markup with no entrance
// animation. The wordmark's hover behavior is also reversed: it
// previously tightened letter-spacing and became MORE visible on hover
// (opacity 0.06 -> 0.1); it now fades toward fully invisible on hover
// instead (opacity -> 0), which is the actual requested direction.
export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-2 px-6 pt-20 pb-12 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2.5 text-fg">
              <Logo className="h-7 w-7" />
              <span className="font-display text-lg font-bold text-fg">PAWAAC</span>
            </div>
          </div>

          <nav aria-label="Footer" className="grid content-start gap-3.5">
            <p className="label mb-1">Site</p>
            {INTERNAL_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.95rem] text-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
              </a>
            ))}

            {/*
              External links (Corporate_Site, Analyser). These open in a new
              tab since they leave the site, and each carries the
              External_Link_Marker below — never rendered on the internal
              links above.
            */}
            <p className="label mb-1 mt-6">More</p>
            {EXTERNAL_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.95rem] text-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
                <ExternalLinkMarker />
              </a>
            ))}
          </nav>

          <div className="grid content-start gap-3.5">
            <p className="label mb-1">Contact</p>
            <p className="text-[0.95rem] leading-7 text-muted">
              kshitij@pawaac.com
              <br />
              +91 76739 43461
              <br />
              15, 9th Main Rd, Jayanagar 3rd Block,
              <br />
              Bengaluru 560011
            </p>
          </div>
        </div>

        {/* Oversized wordmark, same decorative texture pattern already used
            elsewhere on the site (HomeHero.tsx, HomeAutonomyTeaser.tsx) —
            purely visual, not a heading, so it carries no semantic role.
            This is the ONLY motion left in the Footer: a whileInView
            fade/rise on scroll-into-view, and a hover state that fades the
            wordmark toward fully invisible (opacity -> 0) rather than
            toward more visible. */}
        <div className="mt-20 border-t border-line pt-10">
          <motion.p
            aria-hidden="true"
            className="select-none font-display text-[18vw] font-semibold leading-[0.8] tracking-[-0.04em] text-fg/[0.06] md:text-[12rem]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            PAWAAC
          </motion.p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>© 2026 Bajrang Dronetech Pvt Ltd · Built in India</p>
          <div className="flex gap-3">
            <span className="border border-line px-2 py-1 font-mono text-[10px]">DGCA COMPLIANT</span>
            <span className="border border-line px-2 py-1 font-mono text-[10px]">MeitY RECOGNIZED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
