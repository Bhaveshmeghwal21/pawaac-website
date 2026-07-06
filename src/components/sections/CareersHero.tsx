"use client";

// Spec: pawaac-design-language-evolution — Task 15 (Careers_Page Section 1)
// Requirements: 1.1, 1.3, 4.1, 5.1, 5.4
// Design: design.md -> Page Specifications -> Careers_Page, Section 1
//         (Careers hero)
//
// Persona: Both. Applies the Display_Type oversized background-texture
// pattern (P1) plus a grayscale/geometric Placeholder_Media (P7). This is
// net-new content — no existing homepage section covers a "careers"
// narrative, so there is nothing to migrate here. Headline and supporting
// sentence are reproduced verbatim from design.md's Careers_Page table.
// Real careers-hero imagery (OCP-17) stays blocked pending site-owner
// approval — this section renders only a monochrome, abstract geometric
// Placeholder_Media, never real photography (Requirement 5.1, 5.4).
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
            {/* Placeholder_Media: abstract geometric placeholder (no real
                careers-hero imagery exists yet, pending OCP-17), 4:5
                aspect-boxed, monochrome only (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="100,40 160,90 140,190 60,190 40,90" />
              <line x1="100" y1="40" x2="100" y2="190" />
              <line x1="40" y1="90" x2="160" y2="90" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
