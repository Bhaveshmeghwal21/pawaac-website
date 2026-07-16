"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 8)
// Requirements: 4.1, 4.3, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 8
//         (Request Demo contact band)
//
// Persona: Both. An Uplink_Form-STYLED CTA shell — a styled CTA
// button/band linking to Contact_Page (/contact, task 14) — NOT a full
// form. The actual contact form (with its Uplink_Form field styling)
// lives only on Contact_Page per task 14; duplicating it here would
// reintroduce the old homepage-anchor `Contact.tsx` pattern the migration
// explicitly removes. Reveal_On_Scroll entrance (P5).
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function HomeContactBand() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through.
    <section className="relative overflow-hidden bg-bg/50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="label justify-center">Request demo</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            Talk to the team
          </h2>
          <p className="mx-auto mt-4 max-w-md text-body font-body text-muted">
            Tell us your use case and we&apos;ll follow up within one
            business day.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10">
          <div className="relative mx-auto w-fit border border-grey-800 px-1 py-1">
            <ReticleFrame variant="dark" />
            <a
              href="/contact"
              className="block bg-white px-10 py-4 font-mono text-sm font-semibold uppercase tracking-[0.1em] text-black transition-colors hover:bg-interactive"
            >
              Request a demo →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
