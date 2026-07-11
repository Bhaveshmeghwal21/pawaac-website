"use client";

// Spec: pawaac-design-language-evolution — Task 59 (News_Page Section 1)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> News_Page, Section 1
//         (News hero / listing) — OCP-19 designed empty state via
//         site-owner-delegated judgment
//
// Persona: Both. Headline and supporting sentence are reproduced verbatim
// from design.md's table. Applies the Display_Type oversized
// background-texture pattern (P1), purely decorative and hidden from
// assistive technology (Requirement 10.6).
//
// OCP-19 (real news content) stays open — this section renders as a
// structural page only. No fabricated real-sounding headlines/dates are
// invented. Rather than a bare one-line empty state, the listing area now
// renders an intentionally designed "no news yet" state — a
// Reticle_Frame-boxed panel with a clear supporting line and a
// "Get in touch" CTA to /contact — so the empty state feels deliberate
// rather than unfinished (Requirement 5.4, 8.1).
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

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
          open, so no real or fabricated news items are rendered here — a
          designed, intentional-feeling empty state is shown instead
          (Requirement 5.4, 8.1), rather than a bare one-line message.
        */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-16 max-w-2xl border border-line px-8 py-20 text-center">
            <ReticleFrame variant="dark" />
            <p className="label">No news yet</p>
            <p className="mt-4 text-body font-body text-muted">
              Check back soon, or get in touch — we&apos;re happy to talk
              about what we&apos;re building in the meantime.
            </p>
            <a
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-fg"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
