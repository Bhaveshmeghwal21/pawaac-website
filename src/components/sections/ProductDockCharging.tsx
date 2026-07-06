"use client";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page Section 4)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Product_Page, Section 4
//         (Dock & charging)
//
// Persona: Enterprise_Persona. Placed after the Defense_Police_Persona
// sections (1, 2) per the persona-ordering policy (Property 7); Section 3
// is "Both" and sits between them. Uses a grayscale/geometric
// Placeholder_Media (abstract SVG, monochrome only) — real dock
// photography/diagram (OCP-08) stays blocked pending approval.
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
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm border border-[#d6d6d6]"
            style={{ aspectRatio: "4 / 3" }}
          >
            {/* Placeholder_Media: abstract geometric dock-diagram
                placeholder, monochrome only (Requirement 5.1, 5.4) */}
            <svg
              viewBox="0 0 200 150"
              className="h-full w-full p-10 text-[#8f8f8f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="30" y="90" width="140" height="40" />
              <line x1="100" y1="90" x2="100" y2="40" />
              <circle cx="100" cy="30" r="10" />
              <line x1="70" y1="55" x2="130" y2="55" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
