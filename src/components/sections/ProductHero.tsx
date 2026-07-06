"use client";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page Section 1)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4
// Design: design.md -> Page Specifications -> Product_Page, Section 1
//         (Hero / hardware overview)
//
// Persona: Defense_Police_Persona. Applies the Display_Type oversized
// background-texture pattern (P1), a grayscale placeholder hero (P7), and
// Reticle_Frame (P4) around the media block, per design.md. Real hardware
// photography (OCP-06) is blocked pending site-owner approval — this
// section renders only a monochrome geometric Placeholder_Media, never a
// numeral-sounding or fabricated claim.
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        PLATFORM
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Product</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            The Pawaac autonomous drone platform
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Purpose-built airframe, sensor payload, and dock, engineered together.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto w-full max-w-sm grayscale"
            style={{
              aspectRatio: "4 / 5",
              background: "radial-gradient(circle, #181818, #080808)",
            }}
          >
            {/* Placeholder_Media: geometric drone-outline placeholder,
                4:5 aspect-boxed, monochrome only (Requirement 5.1, 5.4).
                Purely decorative line-art — no simulated telemetry. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 250"
              className="absolute inset-0 h-full w-full p-10 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="20" y1="125" x2="180" y2="125" />
              <line x1="100" y1="60" x2="100" y2="190" />
              <circle cx="20" cy="125" r="14" />
              <circle cx="180" cy="125" r="14" />
              <circle cx="100" cy="60" r="14" />
              <circle cx="100" cy="190" r="14" />
              <rect x="80" y="105" width="40" height="40" />
            </svg>
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
