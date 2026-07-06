"use client";

// Spec: pawaac-design-language-evolution — Task 12 (Deployments_Page Section 4)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4, 6.2, 6.3
// Design: design.md -> Page Specifications -> Deployments_Page, Section 4
//         (Critical infrastructure protection)
//
// Persona: Enterprise_Persona. Sector label: `infrastructure` (Requirement
// 6.2 — exactly one label from the fixed set). Positioned last, after the
// two Defense_Police_Persona sections and the `industrial` section, per
// the persona-ordering policy (Property 7, Requirement 6.3). Net-new
// component; does not modify Traction.tsx. Headline/supporting sentence
// reproduced verbatim from design.md's table; no additional generalized
// description or customer/partner reference is invented (gated by OCP-13,
// Phase 4). Monochrome Placeholder_Media only — no unconfirmed numerals
// carried over from Traction.tsx.
import Reveal from "@/components/ui/Reveal";

export default function DeploymentsInfrastructure() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 text-[#080808] md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal delay={0.1} className="order-2 md:order-1">
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm border border-[#d6d6d6]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Placeholder_Media: abstract geometric grid/tower placeholder
                (transmission-tower silhouette over a nodal grid line),
                16:9 aspect-boxed, monochrome only (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 220 124"
              className="h-full w-full p-8 text-[#8f8f8f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M110 20 L80 104 M110 20 L140 104 M92 60 L128 60 M86 82 L134 82" />
              <line x1="10" y1="104" x2="210" y2="104" />
              <circle cx="30" cy="104" r="3" fill="currentColor" stroke="none" />
              <circle cx="190" cy="104" r="3" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2">
          <p className="label text-[#6b6b6b]">infrastructure</p>
          <h2 className="mt-3 text-heading font-display text-[#080808]">
            Critical infrastructure protection
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-[#454545]">
            Autonomous coverage for utilities and infrastructure assets.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
