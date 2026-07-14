"use client";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page Section 1)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4
// Design: design.md -> Page Specifications -> Product_Page, Section 1
//         (Hero / hardware overview) — OCP-06 resolved via
//         site-owner-delegated judgment
//
// Persona: Defense_Police_Persona. Applies the Display_Type oversized
// background-texture pattern (P1), Reticle_Frame (P4) around the media
// block, per design.md.
//
// OCP-06 resolved: this top-level /product page is a lead-in to the two
// real sub-pages (HawkAI Plus, Sentrivion) and its headline is generically
// about "the Pawaac autonomous drone platform" (not product-specific), so
// reusing `public/images/hawkai-plus-product-2.jpg` — the UNUSED alt
// HawkAI photo, real brochure-extracted photography — is honest here. It
// is rendered with the site's standard grayscale filter + Reticle_Frame,
// and its alt text describes it generically as platform hardware rather
// than implying a third, distinct product.
import Image from "next/image";
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
            className="relative mx-auto w-full max-w-sm"
            style={{ aspectRatio: "4 / 5" }}
          >
            {/* Real brochure-extracted platform photo (resolved OCP-06),
                grayscale resting-state filter per the site's monochrome
                pattern (Requirement 3.1-3.2). */}
            <Image
              src="/images/hawkai-plus-product-2.jpg"
              alt="Pawaac autonomous drone platform hardware"
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
