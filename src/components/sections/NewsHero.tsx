"use client";

// Spec: pawaac-design-language-evolution — Task 59 (News_Page Section 1)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> News_Page, Section 1
//         (News hero / listing)
//
// Persona: Both. Headline and supporting sentence are reproduced verbatim
// from design.md's table. Applies the Display_Type oversized
// background-texture pattern (P1), purely decorative and hidden from
// assistive technology (Requirement 10.6).
//
// OCP-19 (real news content) stays open — this section renders as a
// structural page only. No fabricated real-sounding headlines/dates are
// invented; the listing area shows an explicit, honest empty state
// ("No news yet — check back soon.") rather than any placeholder news
// item, per the task's instruction to avoid fabricated content
// (Requirement 5.4, 8.1).
import Reveal from "@/components/ui/Reveal";

export default function NewsHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-28 md:py-36">
      {/* Display_Type oversized background texture (Pattern 1), purely
          decorative — hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        NEWS
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="label">News</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Updates from the field
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Company and product news, as it happens.
          </p>
        </Reveal>

        {/*
          Structural-only listing area. OCP-19 (real news content) stays
          open, so no real or fabricated news items are rendered here — an
          honest empty state is shown instead (Requirement 5.4, 8.1).
        */}
        <Reveal delay={0.1}>
          <div className="mt-16 border border-line px-8 py-16 text-center">
            <p className="technical-data text-muted">
              No news yet — check back soon.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
