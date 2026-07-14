"use client";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page Section 4)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Product_Page, Section 4
//         (Dock & charging) — OCP-08 resolved via site-owner-delegated
//         judgment
//
// Persona: Enterprise_Persona. Placed after the Defense_Police_Persona
// sections (1, 2) per the persona-ordering policy (Property 7); Section 3
// is "Both" and sits between them.
//
// OCP-08 resolved: no real dock photo exists in any asset, so this
// renders a denser, clearly diagram-style GENERATED SVG technical
// illustration (isometric-ish schematic line-art of a drone resting in a
// dock cradle, with labeled callouts) rather than an abstract placeholder
// implying a real product photo that doesn't exist. Pure SVG/CSS,
// monochrome only (Requirement 5.1, 5.4) — no fabricated figures.
import Reveal from "@/components/ui/Reveal";

export default function ProductDockCharging() {
  return (
    <section className="relative bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label text-[#6b6b6b]">Dock &amp; charging</p>
          <h2 className="mt-3 text-heading font-display text-[#080808]">
            Dock, charge, redeploy — automatically
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-[#454545]">
            The dock recharges and redeploys the drone without a human in the loop.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto w-full max-w-md border border-[#d6d6d6] bg-white"
            style={{ aspectRatio: "4 / 3" }}
          >
            {/* Denser, clearly diagram-style GENERATED technical
                illustration (resolved OCP-08): an isometric-leaning
                schematic line-art of a drone resting in a dock cradle,
                with labeled callouts. Pure SVG/CSS, monochrome only
                (Requirement 5.1, 5.4) — reads as an honest engineering
                diagram, not a photo stand-in. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 225"
              className="h-full w-full p-8 text-[#454545]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              {/* background schematic grid */}
              <g opacity="0.2" strokeWidth="0.5">
                <line x1="0" y1="45" x2="300" y2="45" />
                <line x1="0" y1="90" x2="300" y2="90" />
                <line x1="0" y1="135" x2="300" y2="135" />
                <line x1="0" y1="180" x2="300" y2="180" />
                <line x1="60" y1="0" x2="60" y2="225" />
                <line x1="150" y1="0" x2="150" y2="225" />
                <line x1="240" y1="0" x2="240" y2="225" />
              </g>

              {/* weatherproof housing outline (isometric-style box) */}
              <path
                d="M40 150 L150 190 L260 150 L260 100 L150 60 L40 100 Z"
                strokeWidth="1.5"
              />
              <path d="M40 100 L150 140 L260 100" />
              <path d="M150 140 L150 190" />

              {/* dock cradle */}
              <path d="M100 128 L150 145 L200 128" strokeWidth="1.5" />

              {/* drone body resting in cradle */}
              <rect x="118" y="95" width="64" height="20" rx="3" strokeWidth="1.5" />
              <line x1="118" y1="105" x2="90" y2="90" />
              <line x1="182" y1="105" x2="210" y2="90" />
              <line x1="118" y1="105" x2="90" y2="120" />
              <line x1="182" y1="105" x2="210" y2="120" />
              <circle cx="90" cy="90" r="8" />
              <circle cx="210" cy="90" r="8" />
              <circle cx="90" cy="120" r="8" />
              <circle cx="210" cy="120" r="8" />

              {/* charging contacts */}
              <rect x="140" y="115" width="6" height="10" fill="currentColor" stroke="none" />
              <rect x="154" y="115" width="6" height="10" fill="currentColor" stroke="none" />

              {/* auto-redeploy sensor mast */}
              <line x1="150" y1="60" x2="150" y2="40" strokeWidth="1.5" />
              <circle cx="150" cy="35" r="5" strokeWidth="1.5" />

              {/* callout leader lines + labels */}
              <line x1="146" y1="118" x2="70" y2="200" strokeWidth="0.75" />
              <text x="20" y="212" fontSize="8" fill="currentColor" stroke="none" letterSpacing="0.5">
                CHARGING CONTACTS
              </text>

              <line x1="255" y1="120" x2="285" y2="170" strokeWidth="0.75" />
              <text x="230" y="185" fontSize="8" fill="currentColor" stroke="none" letterSpacing="0.5">
                WEATHERPROOF HOUSING
              </text>

              <line x1="150" y1="35" x2="230" y2="20" strokeWidth="0.75" />
              <text x="150" y="14" fontSize="8" fill="currentColor" stroke="none" letterSpacing="0.5">
                AUTO-REDEPLOY SENSOR
              </text>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
