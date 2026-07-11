"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 4)
// Requirements: 4.1, 4.3, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 4
//         (Autonomy stack teaser)
//
// Persona: Both. Oversized numeral/word-fragment background texture (P1),
// Reticle_Frame on an abstract diagram (P4), linking to Autonomy_Page
// (/autonomy, task 11). No Change_Proposal gates this section.
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function HomeAutonomyTeaser() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through.
    <section className="relative overflow-hidden bg-bg/50 px-6 py-28 md:py-36">
      {/* Oversized word-fragment background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-4 select-none text-center font-display text-[18vw] font-bold uppercase leading-none text-fg/[0.04] md:top-8"
      >
        STACK
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Autonomy</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            One stack: sense, decide, act
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            The same autonomy engine powers detection, planning, and
            dispatch.
          </p>
          <a
            href="/autonomy"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-fg"
          >
            See how it works
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto w-full max-w-sm grayscale"
            style={{
              aspectRatio: "4 / 5",
              background: "radial-gradient(circle, #181818, #080808)",
            }}
          >
            {/* Abstract system-diagram Placeholder_Media (geometric
                node/pipeline diagram), monochrome only (Requirement 5.1,
                5.4). Denser than the original 4-node sketch: three labeled
                pipeline stages (Sense / Decide / Act) each with a small
                sensor cluster feeding a central processing node, plus a
                faint background grid for technical-schematic texture. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* faint background grid */}
              <g opacity="0.25" strokeWidth="0.75">
                <line x1="0" y1="50" x2="200" y2="50" />
                <line x1="0" y1="100" x2="200" y2="100" />
                <line x1="0" y1="150" x2="200" y2="150" />
                <line x1="0" y1="200" x2="200" y2="200" />
                <line x1="50" y1="0" x2="50" y2="250" />
                <line x1="150" y1="0" x2="150" y2="250" />
              </g>

              {/* Sense cluster */}
              <circle cx="40" cy="45" r="6" />
              <circle cx="60" cy="30" r="6" />
              <circle cx="60" cy="60" r="6" />
              <line x1="46" y1="45" x2="94" y2="60" />
              <line x1="65" y1="33" x2="94" y2="60" />
              <line x1="65" y1="57" x2="94" y2="60" />

              {/* Decide (central node) */}
              <circle cx="100" cy="70" r="16" strokeWidth="2" />
              <line x1="100" y1="86" x2="100" y2="130" />

              {/* Act cluster */}
              <rect x="70" y="150" width="24" height="24" />
              <rect x="106" y="150" width="24" height="24" />
              <rect x="142" y="150" width="24" height="24" />
              <line x1="100" y1="130" x2="82" y2="150" />
              <line x1="100" y1="130" x2="118" y2="150" />
              <line x1="100" y1="130" x2="154" y2="150" />

              {/* stage labels */}
              <text x="20" y="20" fontSize="8" fill="currentColor" stroke="none" letterSpacing="1">SENSE</text>
              <text x="118" y="66" fontSize="8" fill="currentColor" stroke="none" letterSpacing="1">DECIDE</text>
              <text x="80" y="195" fontSize="8" fill="currentColor" stroke="none" letterSpacing="1">ACT</text>
            </svg>
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
