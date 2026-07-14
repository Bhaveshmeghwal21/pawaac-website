"use client";

// Spec: pawaac-design-language-evolution — Task 11 (Autonomy_Page Section 1)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Autonomy_Page, Section 1
//         (Hero / autonomy thesis)
//
// Persona: Defense_Police_Persona. Applies the Display_Type oversized
// background-texture pattern (P1) and a grayscale/geometric Placeholder_Media
// (P7) — no real hero photography is available, and none is fabricated here
// (Requirement 5.1, 5.4). This is a net-new hero built for `/autonomy`; it
// does not modify or reuse markup from any existing section component.
import Reveal from "@/components/ui/Reveal";

export default function AutonomyHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        AUTONOMY
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Autonomy</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Decisions at the edge, not the console
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Onboard autonomy senses, classifies, and acts without a constant
            human link.
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
            {/* Placeholder_Media: geometric node/edge placeholder, 4:5
                aspect-boxed, monochrome only (Requirement 5.1, 5.4). Purely
                decorative line-art — no simulated telemetry. */}
            <svg
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="100" cy="70" r="12" />
              <circle cx="55" cy="150" r="12" />
              <circle cx="145" cy="150" r="12" />
              <circle cx="100" cy="210" r="12" />
              <line x1="100" y1="82" x2="55" y2="138" />
              <line x1="100" y1="82" x2="145" y2="138" />
              <line x1="55" y1="162" x2="100" y2="198" />
              <line x1="145" y1="162" x2="100" y2="198" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
