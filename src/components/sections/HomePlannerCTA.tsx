"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 5)
// Requirements: 4.1, 4.3, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 5
//         (Coverage planner CTA)
//
// Persona: Both. Static preview frame with Reticle_Frame (P4), linking to
// Planner_Page (/designer, existing route). No Change_Proposal gates this
// section — the preview is a static, non-live, geometric map placeholder,
// not a screenshot of real deployment data.
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function HomePlannerCTA() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through.
    <section className="relative overflow-hidden bg-bg/50 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Planner</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            Model your own coverage area
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Try the interactive planner used in real deployment design.
          </p>
          <a
            href="/designer"
            className="mt-6 inline-block border border-fg px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg"
          >
            Open the planner
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-md grayscale"
            style={{
              aspectRatio: "4 / 3",
              background: "radial-gradient(circle, #181818, #080808)",
            }}
          >
            {/* Static screenshot-style geometric map Placeholder_Media —
                grid lines, a bounded zone, and dock markers, monochrome
                only (Requirement 5.1, 5.4). Not a live/simulated readout. */}
            <svg
              viewBox="0 0 220 165"
              className="absolute inset-0 h-full w-full p-8 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="20" y="20" width="180" height="125" strokeDasharray="4 4" />
              <circle cx="70" cy="70" r="30" />
              <circle cx="140" cy="95" r="30" />
              <circle cx="70" cy="70" r="4" fill="currentColor" stroke="none" />
              <circle cx="140" cy="95" r="4" fill="currentColor" stroke="none" />
            </svg>
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
