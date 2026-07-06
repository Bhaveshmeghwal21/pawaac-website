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
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
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
                nodes/lines), monochrome only (Requirement 5.1, 5.4) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="100" cy="60" r="12" />
              <circle cx="55" cy="140" r="12" />
              <circle cx="145" cy="140" r="12" />
              <circle cx="100" cy="200" r="12" />
              <line x1="100" y1="72" x2="55" y2="128" />
              <line x1="100" y1="72" x2="145" y2="128" />
              <line x1="55" y1="152" x2="100" y2="188" />
              <line x1="145" y1="152" x2="100" y2="188" />
            </svg>
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
