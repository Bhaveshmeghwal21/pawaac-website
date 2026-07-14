"use client";

// Spec: pawaac-design-language-evolution — Commitments_Page restructure
// (resolves OCP-20, Section 4 of the new "Our Vision & Commitments" page,
// supersedes the original Task 60 single-section implementation)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Commitments_Page ("Our
//         Vision & Commitments"), Section 4 (Our Commitments)
//
// Persona: Both. Now Section 4 of the 4-section /commitments page (after
// VisionHero, VisionIntro, VisionPillars) rather than the page's sole
// section — an explicit "Our Commitments" H2 heading was added above the
// existing 4 principle cards (the headline changed from an <h1> to an
// <h2> accordingly, since VisionHero.tsx now carries the page's single
// <h1>) so this reads as its own labeled section within the new page
// flow. The 4 principles and their descriptions below are UNCHANGED from
// the prior implementation. Reuses the same label + description card
// pattern as src/components/sections/AutonomySafeguards.tsx.
//
// OCP-20 is now RESOLVED: the founder supplied real, approved copy for
// Sections 1-3 of this page (Vision hero, Introducing Pawaac, Vision
// pillars — see VisionHero.tsx/VisionIntro.tsx/VisionPillars.tsx), and
// this section's 4 generic principles are kept exactly as previously
// approved. See design.md's Resolved Change Proposals table.
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
        <h2 className="mt-3 text-heading font-display text-[#080808]">
          Our Commitments
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-[#454545]">
          Our principles for safety, oversight, and data handling.
        </p>

        {/* Technical_Data rule-list styling (Pattern 2), reusing the same
            label + description card pattern as AutonomySafeguards.tsx. */}
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
