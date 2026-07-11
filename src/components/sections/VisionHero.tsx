"use client";

// Spec: pawaac-design-language-evolution — Commitments_Page restructure
// (resolves OCP-20 alongside VisionIntro/VisionPillars/CommitmentsPrinciples)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Commitments_Page ("Our
//         Vision & Commitments"), Section 1 (Vision hero)
//
// Persona: Both. Section 1 of the restructured 4-section `/commitments`
// page. Applies the same Display_Type oversized background-texture
// pattern (P1) already used by CareersHero/NewsHero, plus a real,
// previously-UNUSED photo (`public/images/skyimage.jpg` — distinct from
// `skyimage2.jpg`, which is already the Homepage's full-bleed SkyScenery
// background) rendered as a large bounded hero-media banner, grayscale
// filter + `Reticle_Frame` (P4), matching HomeHero.tsx's own
// word-mark-texture-behind + large boxed-media-below structure.
//
// Founder-authored copy (verbatim, resolves OCP-20's hero framing): the
// eyebrow, headline, and supporting sentence below are reproduced exactly
// as approved.
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function VisionHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        VISION
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="label">Vision &amp; Commitments</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Our Vision
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Why Pawaac exists, and what we&apos;re building toward.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div
            className="relative mx-auto w-full max-w-5xl"
            style={{ aspectRatio: "16 / 7" }}
          >
            {/* Real, previously-unused photo, grayscale resting-state
                filter per the site's monochrome pattern (Requirement
                3.1-3.2). Purely atmospheric/mood imagery for the Vision
                section — no specific claim implied by the image itself. */}
            <Image
              src="/images/skyimage.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 1024px, 100vw"
              className="object-cover grayscale"
              style={{ objectPosition: "center 35%" }}
              priority
            />
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
