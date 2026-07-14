"use client";

// Spec: pawaac-design-language-evolution — Task 13 (Company_Page Section 1)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Company_Page, Section 1
//         (Company hero) — OCP-15 resolved via site-owner-delegated
//         judgment
//
// Persona: Both. Headline and supporting sentence are reproduced verbatim
// from design.md's table.
//
// OCP-15 resolved: no office/HQ photo exists, and fabricating a
// building/office photo is explicitly out of scope. Rather than leaving
// this as an abstract-icon placeholder, it is resolved to a purely
// typographic/graphic hero — a full-bleed Display_Type word-mark/texture
// treatment is the sole visual, consistent with the other hero sections'
// Pattern 1 background-texture pattern. No photo is needed: the section's
// headline is about the company/mission, not a physical location.
import Reveal from "@/components/ui/Reveal";

export default function CompanyHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-32 md:py-44">
      {/* Display_Type oversized word-mark texture (Pattern 1), rendered as
          the section's sole visual (resolved OCP-15) — purely decorative,
          hidden from assistive technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[16vw] font-bold uppercase leading-none text-fg/[0.05] md:text-[13vw]"
      >
        BAJRANG
      </span>

      {/* Secondary, smaller texture line for depth without implying a
          third company name — reinforces the graphic/typographic
          treatment rather than substituting for missing photography. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 select-none text-center font-mono text-[9vw] font-semibold uppercase leading-none tracking-tight text-fg/[0.035] md:text-[6vw]"
      >
        DRONETECH
      </span>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="label">Company</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Bajrang Dronetech Pvt Ltd
          </h1>
          <p className="mx-auto mt-4 max-w-md text-body font-body text-muted">
            The team building Pawaac, engineering autonomy for the field.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
