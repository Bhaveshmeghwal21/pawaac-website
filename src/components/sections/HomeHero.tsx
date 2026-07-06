"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 1)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 1 (Hero)
//
// Persona: Defense_Police_Persona. Replaces the old, unstyled
// `Hero.tsx` on the Homepage render tree (that file is left on disk,
// unused, per the same "don't break things, don't delete" convention
// used for DroneShowcase/VisionAI/DecisionOS/Traction/Contact) with a
// net-new hero matching design.md's exact Homepage table copy:
// oversized Display_Type word-mark texture behind the hero media (P1),
// Reticle_Frame around the media block (P4), Reveal_On_Scroll clip-path
// entrance (P5), grayscale geometric drone-silhouette Placeholder_Media
// at 16:9 (P7). Real hero photography/video (OCP-18) stays blocked
// pending site-owner approval — only a monochrome geometric placeholder
// is rendered here (Requirement 5.1, 5.4).
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized word-mark texture behind hero media
          (Pattern 1), purely decorative — hidden from assistive
          technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        PAWAAC
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="label">Defense &amp; police</p>
          <h1 className="mt-3 max-w-2xl text-heading font-display text-fg">
            Autonomous perimeter response, built in India
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Pawaac drones patrol, detect, and respond without a pilot on
            every flight.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div
            className="relative mx-auto w-full max-w-4xl grayscale"
            style={{
              aspectRatio: "16 / 9",
              background: "radial-gradient(circle at 60% 40%, #181818, #080808)",
            }}
          >
            {/* Placeholder_Media: geometric angular drone-silhouette
                line-art, 16:9 aspect-boxed, monochrome only
                (Requirement 5.1, 5.4). Purely decorative — no simulated
                telemetry or live-style readout. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 320 180"
              className="absolute inset-0 h-full w-full p-14 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="30" y1="90" x2="290" y2="90" />
              <line x1="160" y1="40" x2="160" y2="140" />
              <circle cx="30" cy="90" r="16" />
              <circle cx="290" cy="90" r="16" />
              <circle cx="160" cy="40" r="16" />
              <circle cx="160" cy="140" r="16" />
              <rect x="130" y="70" width="60" height="40" />
            </svg>
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
