"use client";

// Spec: pawaac-design-language-evolution — Task 15 (Careers_Page Section 1)
// Requirements: 1.1, 1.3, 4.1, 5.1, 5.4
// Design: design.md -> Page Specifications -> Careers_Page, Section 1
//         (Careers hero) — OCP-17 resolved via site-owner-delegated
//         judgment
//
// Persona: Both. Applies the Display_Type oversized background-texture
// pattern (P1). Headline and supporting sentence are reproduced verbatim
// from design.md's Careers_Page table.
//
// OCP-17 resolved: no real careers-specific photo exists, and fabricating
// an office/team photo is out of scope. Resolved with a generated,
// abstract "join the team" graphic — geometric figure/node cluster
// converging toward a shared point — rather than an office/team photo
// that doesn't exist. Pure SVG/CSS, monochrome only (Requirement 5.1,
// 5.4).
import Reveal from "@/components/ui/Reveal";

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        CAREERS
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Careers</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Build the field-ready autonomy stack
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            We hire for hardware, autonomy software, and field operations.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm grayscale"
            style={{
              aspectRatio: "4 / 5",
              background: "radial-gradient(circle, #181818, #080808)",
            }}
          >
            {/* Generated abstract "join the team" graphic (resolved
                OCP-17): a cluster of geometric figures/nodes converging
                toward a shared central point, monochrome only
                (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="60" cy="70" r="14" />
              <circle cx="140" cy="70" r="14" />
              <circle cx="45" cy="150" r="14" />
              <circle cx="155" cy="150" r="14" />
              <circle cx="100" cy="120" r="20" strokeWidth="2" />
              <line x1="72" y1="80" x2="88" y2="108" />
              <line x1="128" y1="80" x2="112" y2="108" />
              <line x1="57" y1="140" x2="83" y2="128" />
              <line x1="143" y1="140" x2="117" y2="128" />
              <line x1="100" y1="140" x2="100" y2="190" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
