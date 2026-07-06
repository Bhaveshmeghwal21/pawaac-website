"use client";

// Spec: pawaac-design-language-evolution — Task 12 (Deployments_Page Section 1)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4, 6.2, 6.3
// Design: design.md -> Page Specifications -> Deployments_Page, Section 1
//         (Border & perimeter defense)
//
// Persona: Defense_Police_Persona. Sector label: `defense` (Requirement 6.2
// — exactly one label from the fixed set). This is a net-new component
// built for the `/deployments` route; it does not modify
// `src/components/sections/Traction.tsx`, whose SECTORS/STATS content stays
// untouched and still renders on the Homepage until task 16. Headline and
// supporting sentence are reproduced verbatim from design.md's
// Deployments_Page table — no additional generalized-location phrasing is
// invented here (that refinement is gated by OCP-10, Phase 4). Renders only
// a monochrome, abstract Placeholder_Media (Requirement 5.1, 5.4) — none of
// Traction.tsx's unconfirmed numerals (500+, 99.9%, etc.) are carried over.
import Reveal from "@/components/ui/Reveal";

export default function DeploymentsDefense() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label text-muted">defense</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            Border and perimeter defense
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Continuous autonomous patrol along extended perimeters.
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
            {/* Placeholder_Media: abstract geometric perimeter-line
                placeholder (dashed boundary with waypoint nodes), 16:9
                aspect-boxed, monochrome only (Requirement 5.1, 5.4). No
                simulated telemetry or identifying detail. */}
            <svg
              viewBox="0 0 220 124"
              className="absolute inset-0 h-full w-full p-8 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 100 L60 40 L120 60 L170 24 L210 50" strokeDasharray="6 5" />
              <circle cx="10" cy="100" r="5" />
              <circle cx="60" cy="40" r="5" />
              <circle cx="120" cy="60" r="5" />
              <circle cx="170" cy="24" r="5" />
              <circle cx="210" cy="50" r="5" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
