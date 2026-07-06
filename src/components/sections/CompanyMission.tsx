"use client";

// Spec: pawaac-design-language-evolution — Task 13 (Company_Page Section 2)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Company_Page, Section 2
//         (Mission & approach)
//
// Persona: Both. This section has NO linked Change_Proposal in design.md
// (its Change_Proposals column is "None") — the headline and supporting
// sentence below are rendered fully and exactly as specified, with no
// gating. Uses Technical_Data pull-quote styling (Pattern 2) per the
// design table; no visual element beyond the styled pull-quote is
// specified for this section.
import Reveal from "@/components/ui/Reveal";

export default function CompanyMission() {
  return (
    <section className="relative bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="label text-[#6b6b6b]">Mission</p>
          <h2 className="mt-3 text-heading font-display text-[#080808]">
            Why we build autonomy, not remote control
          </h2>

          {/* Technical_Data pull-quote styling (Pattern 2) — NOT gated by
              any Change_Proposal (design.md marks this section's
              Change_Proposals column "None"). */}
          <blockquote className="mt-8 border-l-2 border-[#d6d6d6] pl-6">
            <p className="technical-data text-lg leading-relaxed text-[#454545]">
              Autonomous systems reduce operator burden in high-stakes
              environments.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
