"use client";

// Spec: pawaac-design-language-evolution — Task 60 (Commitments_Page Section 1)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Commitments_Page, Section 1
//         (Our commitments)
//
// Persona: Both. Headline and supporting sentence are reproduced verbatim
// from design.md's table. Reuses the exact same Technical_Data rule-list
// visual pattern as src/components/sections/AutonomySafeguards.tsx, per the
// task's instruction.
//
// OCP-20 (specific commitment claims/policies) stays open, so this section
// renders only generic, short, non-specific rule-list labels — no
// elaboration, no specific policy claim — the same discipline as
// AutonomySafeguards' placeholder (Requirement 8.1, 8.3).
export default function CommitmentsPrinciples() {
  return (
    <section className="relative bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto max-w-7xl">
        <p className="label text-[#6b6b6b]">Commitments</p>
        <h1 className="mt-3 text-heading font-display text-[#080808]">
          How we build responsibly
        </h1>
        <p className="mt-4 max-w-md text-body font-body text-[#454545]">
          Our principles for safety, oversight, and data handling.
        </p>

        {/* Technical_Data rule-list styling (Pattern 2), reusing the exact
            same pattern as AutonomySafeguards.tsx. Generic short labels
            only — no elaboration, no specific policy claim, pending
            OCP-20 approval. */}
        <ul className="mt-12 grid gap-px border border-[#d6d6d6] bg-[#d6d6d6] sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Human oversight",
            "Data minimization",
            "Fail-safe design",
            "Responsible deployment",
          ].map((item) => (
            <li key={item} className="bg-white p-6">
              <p className="technical-data text-[#8f8f8f]">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
