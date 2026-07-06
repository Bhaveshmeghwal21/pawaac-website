"use client";

// Spec: pawaac-design-language-evolution — Task 11 (Autonomy_Page Section 4)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Autonomy_Page, Section 4
//         (Autonomy safeguards)
//
// Persona: Both. Renders only the section shell/headline/supporting
// sentence already specified (and approved as content) in design.md's
// Autonomy_Page table. Claim-level DETAIL beyond that headline/supporting
// sentence is gated by OCP-09 (open Change Proposal — see Phase 4, task
// 48) per Requirement 7.2, so the rule list below is intentionally a
// generic, non-specific placeholder/stub: short labels only, no
// elaboration, no specific safeguard mechanism claim.
export default function AutonomySafeguards() {
  return (
    <section className="relative bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto max-w-7xl">
        <p className="label text-[#6b6b6b]">Safeguards</p>
        <h2 className="mt-3 text-heading font-display text-[#080808]">
          Guardrails built into every decision
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-[#454545]">
          Autonomy operates inside defined geofences and operator-set rules.
        </p>

        {/* Technical_Data rule-list styling (Pattern 2). Placeholder/stub
            labels only — no elaboration, pending OCP-09 approval. */}
        <ul className="mt-12 grid gap-px border border-[#d6d6d6] bg-[#d6d6d6] sm:grid-cols-2 lg:grid-cols-4">
          {["Geofence enforcement", "Operator override", "Rule-based limits", "Fail-safe return"].map(
            (item) => (
              <li key={item} className="bg-white p-6">
                <p className="technical-data text-[#8f8f8f]">{item}</p>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
