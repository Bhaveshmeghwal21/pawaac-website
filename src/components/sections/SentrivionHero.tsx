"use client";

// Spec: pawaac-design-language-evolution — Task 67 (Sentrivion Sub-Page Section 1)
// Requirements: 1.1, 4.1, 4.3, 4.4, 5.1, 5.4, 9.6
// Design: design.md -> Page Specifications -> Sentrivion Product Sub-Page,
//         Section 1 (Hero/overview)
//
// Persona: Defense_Police_Persona. Applies the Display_Type oversized
// background-texture pattern (P1) "SENTRIVION", a REAL confirmed hero
// photo (public/images/sentrivion-product-1.jpg — resolved OCP-07)
// rendered via next/image with a grayscale filter matching the site's
// monochrome resting-state pattern, and Reticle_Frame (P4) overlaid on
// the media block.
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function SentrivionHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[16vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        SENTRIVION
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Product / Sentrivion</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Sentrivion: ultra-light, rapid-deploy VTOL
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Long endurance, autonomous VTOL built for surveillance and
            mapping.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto w-full max-w-sm"
            style={{ aspectRatio: "4 / 3" }}
          >
            {/* Real confirmed brochure photo, grayscale resting-state
                filter per the site's monochrome pattern (Requirement
                3.1-3.2). */}
            <Image
              src="/images/sentrivion-product-1.jpg"
              alt="Sentrivion VTOL drone on its docking/charging station"
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover grayscale"
              priority
            />
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
