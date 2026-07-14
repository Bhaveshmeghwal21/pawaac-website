"use client";

// Spec: pawaac-design-language-evolution — Task 59 (News_Page Section 1),
// updated for News_Page real content (resolves OCP-19)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> News_Page, Section 1
//         (News hero / listing)
//
// Persona: Both. Headline and supporting sentence are reproduced verbatim
// from design.md's table. Applies the Display_Type oversized
// background-texture pattern (P1), purely decorative and hidden from
// assistive technology (Requirement 10.6).
//
// OCP-19 is now RESOLVED: the founder-approved "designed empty state"
// (a Reticle_Frame-boxed "No news yet" panel) has been replaced with a
// real listing — see NewsList.tsx, which currently renders exactly 1 real
// news item. See design.md's Resolved Change Proposals table.
import Reveal from "@/components/ui/Reveal";
import NewsList from "@/components/sections/NewsList";

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

        <NewsList />
      </div>
    </section>
  );
}
