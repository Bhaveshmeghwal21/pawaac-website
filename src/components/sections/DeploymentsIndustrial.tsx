"use client";

// Spec: pawaac-design-language-evolution — Task 12 (Deployments_Page Section 3)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4, 6.2, 6.3
// Design: design.md -> Page Specifications -> Deployments_Page, Section 3
//         (Industrial site security)
//
// Persona: Enterprise_Persona. Sector label: `industrial` (Requirement 6.2
// — exactly one label from the fixed set). Positioned after the two
// Defense_Police_Persona sections per the persona-ordering policy
// (Property 7, Requirement 6.3). Net-new component; does not modify
// Traction.tsx. Headline/supporting sentence reproduced verbatim from
// design.md's table; no additional generalized description or
// customer/partner reference is invented (gated by OCP-12, Phase 4).
// Monochrome Placeholder_Media only — no unconfirmed numerals carried
// over from Traction.tsx.
import Reveal from "@/components/ui/Reveal";

export default function DeploymentsIndustrial() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label text-muted">industrial</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            Industrial site security
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Perimeter monitoring for plants, yards, and industrial campuses.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm grayscale"
            style={{
              aspectRatio: "16 / 9",
              background: "radial-gradient(circle, #181818, #080808)",
            }}
          >
            {/* Placeholder_Media: abstract geometric facility-yard
                placeholder (stacked rectangular structures within a
                bounded lot), 16:9 aspect-boxed, monochrome only
                (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 220 124"
              className="absolute inset-0 h-full w-full p-8 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="16" y="16" width="188" height="92" />
              <rect x="40" y="52" width="40" height="40" />
              <rect x="96" y="36" width="30" height="56" />
              <rect x="144" y="60" width="46" height="32" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
