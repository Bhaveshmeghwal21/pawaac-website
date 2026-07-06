"use client";

// Spec: pawaac-design-language-evolution — Task 13 (Company_Page Section 1)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Company_Page, Section 1
//         (Company hero)
//
// Persona: Both. Applies the Display_Type oversized background-texture
// pattern (P1) using the company name, plus a grayscale/geometric
// Placeholder_Media (P7). This is net-new content — no existing homepage
// section covers a "company" narrative. Headline and supporting sentence
// are reproduced verbatim from design.md's table; real team/office
// photography (OCP-15) stays blocked pending site-owner approval, so this
// section renders only a monochrome, abstract Placeholder_Media (no real
// photography, no fabricated company facts such as founding year or team
// size — Requirement 5.1, 5.4).
import Reveal from "@/components/ui/Reveal";

export default function CompanyHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        BAJRANG
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Company</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Bajrang Dronetech Pvt Ltd
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            The team building Pawaac, engineering autonomy for the field.
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
                team/office photography exists yet, pending OCP-15),
                4:5 aspect-boxed, monochrome only (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="40" y="40" width="120" height="120" />
              <line x1="40" y1="40" x2="160" y2="160" />
              <line x1="160" y1="40" x2="40" y2="160" />
              <circle cx="100" cy="100" r="30" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
