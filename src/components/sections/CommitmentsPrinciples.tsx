"use client";

// Spec: pawaac-design-language-evolution — Task 60 (Commitments_Page Section 1)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Commitments_Page, Section 1
//         (Our commitments) — OCP-20 expanded to generic principles via
//         site-owner-delegated judgment
//
// Persona: Both. Headline and supporting sentence are reproduced verbatim
// from design.md's table. Reuses the same label + description card
// pattern as src/components/sections/AutonomySafeguards.tsx.
//
// OCP-20 remains open for real, site-owner-approved policy copy — no
// specific data-retention period, compliance certification, or
// regulatory claim is fabricated here. Each short label is now paired
// with one honest, generic, non-specific supporting sentence describing
// engineering/ethics principles consistent with autonomy safeguards
// already built and described on Autonomy_Page/Sentrivion (geofencing,
// operator override, fail-safe recovery, etc.) — this is a "designed"
// expansion of generic principles, not a disclosure of new specific
// commitments.
const PRINCIPLES = [
  {
    label: "Human oversight",
    description:
      "Every autonomous action can be reviewed and overridden by a human operator.",
  },
  {
    label: "Data minimization",
    description:
      "Only the data needed for the mission or safety function is captured and retained.",
  },
  {
    label: "Fail-safe design",
    description:
      "Systems default to a safe, controlled state whenever a fault or signal loss occurs.",
  },
  {
    label: "Responsible deployment",
    description:
      "Autonomy is scoped to defined geofences and operator-set rules for every mission.",
  },
];

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

        {/* Technical_Data rule-list styling (Pattern 2), reusing the same
            label + description card pattern as AutonomySafeguards.tsx.
            One honest, generic supporting sentence per principle — no
            specific policy claim, pending full OCP-20 approval. */}
        <ul className="mt-12 grid gap-px border border-[#d6d6d6] bg-[#d6d6d6] sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((item) => (
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
