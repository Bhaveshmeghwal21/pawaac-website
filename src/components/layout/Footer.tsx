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

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 text-fg">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-bold text-fg">PAWAAC</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Pilotless Airborne Warning and Aerial Control. The aerial security
            layer for the physical world.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-muted md:items-center">
          {INTERNAL_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-fg">
              {l.label}
            </a>
          ))}

          {/*
            External links (Corporate_Site, Analyser). These open in a new
            tab since they leave the site, and each carries the
            External_Link_Marker below — never rendered on the internal
            links above.
          */}
          {EXTERNAL_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-fg"
            >
              {l.label}
              <ExternalLinkMarker />
            </a>
          ))}
        </nav>

        <div className="font-mono text-[13px] text-muted md:text-right">
          <p>kshitij@pawaac.com</p>
          <p>+91 76739 43461</p>
          <p className="mt-2">
            15, 9th Main Rd, Jayanagar 3rd Block,
            <br />
            Bengaluru 560011
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>© 2026 Bajrang Dronetech Pvt Ltd</p>
        <div className="flex gap-3">
          <span className="border border-line px-2 py-1 font-mono text-[10px]">DGCA COMPLIANT</span>
          <span className="border border-line px-2 py-1 font-mono text-[10px]">MeitY RECOGNIZED</span>
        </div>
      </div>
    </footer>
  );
}
