"use client";

// Spec: pawaac-design-language-evolution — Task 12 (Deployments_Page Section 2)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4, 6.2, 6.3
// Design: design.md -> Page Specifications -> Deployments_Page, Section 2
//         (Police & law-enforcement patrol)
//
// Persona: Defense_Police_Persona. Sector label: `police` (Requirement 6.2
// — exactly one label from the fixed set). Net-new component; does not
// modify Traction.tsx. Headline/supporting sentence reproduced verbatim
// from design.md's table; no additional generalized-location phrasing is
// invented (gated by OCP-11, Phase 4). Monochrome Placeholder_Media only —
// no unconfirmed numerals carried over from Traction.tsx.
import Reveal from "@/components/ui/Reveal";

export default function DeploymentsPolice() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 text-[#080808] md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal delay={0.1} className="order-2 md:order-1">
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm border border-[#d6d6d6]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Placeholder_Media: abstract geometric patrol-route
                placeholder (radiating sweep arcs from a central marker),
                16:9 aspect-boxed, monochrome only (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 220 124"
              className="h-full w-full p-8 text-[#8f8f8f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="60" cy="62" r="4" fill="currentColor" stroke="none" />
              <circle cx="60" cy="62" r="24" />
              <circle cx="60" cy="62" r="44" />
              <path d="M60 62 L150 30" strokeDasharray="4 4" />
              <path d="M60 62 L170 90" strokeDasharray="4 4" />
            </svg>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2">
          <p className="label text-[#6b6b6b]">police</p>
          <h2 className="mt-3 text-heading font-display text-[#080808]">
            Police and law-enforcement patrol
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-[#454545]">
            Rapid-response coverage for urban and rural patrol zones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
