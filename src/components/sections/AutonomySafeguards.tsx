"use client";

// Spec: pawaac-design-language-evolution — Task 69 (Autonomy_Page Section 4, supersedes Task 11)
// Requirements: 8.1, 8.3
// Design: design.md -> Page Specifications -> Autonomy_Page, Section 4
//         (Autonomy safeguards) — resolved OCP-09
//
// Persona: Both. OCP-09 is now resolved: the HawkAI Plus brochure's
// confirmed "SAFETY FEATURES & APPLICATIONS" section (page 9) lists 6 real,
// built-in safety systems. These replace the prior 4 generic single-word
// stub labels. Each item now renders as a label + short description pair,
// transcribed verbatim from design.md and MUST NOT be altered.
const SAFEGUARDS = [
  { label: "Battery Failsafe", description: "Auto RTH on low power" },
  { label: "Geofence", description: "Virtual boundary protection" },
  { label: "Return to Home", description: "Signal loss recovery" },
  { label: "Emergency Landing", description: "Controlled descent logic" },
  { label: "Mission Recovery", description: "Resume interrupted missions" },
  { label: "Parachute (optional)", description: "Recovery system" },
];

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

        {/* Technical_Data rule-list styling (Pattern 2), now extended to
            show a label + short description pair per card (6 items,
            resolved OCP-09) instead of the prior 4 single-word stubs. */}
        <ul className="mt-12 grid gap-px border border-[#d6d6d6] bg-[#d6d6d6] sm:grid-cols-2 lg:grid-cols-3">
          {SAFEGUARDS.map((item) => (
            <li key={item.label} className="bg-white p-6">
              <p className="technical-data text-[#080808]">{item.label}</p>
              <p className="mt-1 text-[13px] text-[#454545]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
