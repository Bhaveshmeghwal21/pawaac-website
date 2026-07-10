"use client";

// Spec: pawaac-design-language-evolution — Task 67 (Sentrivion Sub-Page Section 2)
// Requirements: 4.1, 4.3, 4.4, 7.2, 8.3
// Design: design.md -> Page Specifications -> Sentrivion Product Sub-Page,
//         Section 2 (Capability specifications)
//
// Persona: Defense_Police_Persona. Renders the Pinned_Spec_Sheet shell with
// the 5 REAL, brochure-confirmed numeral panels (resolved OCP-07). These
// exact figures are transcribed verbatim from the Sentrivion product
// brochure (public/images/Sentrivion_Brochur_compressed.pdf) and MUST NOT
// be altered.
//
// CRITICAL (per design.md's caveat): the source brochure states no
// absolute endurance, weight, or payload-capacity figure for Sentrivion —
// only relative claims ("up to 100% lighter than other drones in its
// class", "built for over 500 surveillance missions"). Do NOT add an
// endurance/weight/payload-capacity numeral panel here. Those relative
// claims are surfaced only as supporting prose in SentrivionCapabilities.tsx
// (Section 3), never as a Pinned_Spec_Sheet numeral.
import PinnedSpecSheet, { SpecPanel } from "@/components/ui/PinnedSpecSheet";

const PANELS: SpecPanel[] = [
  {
    label: "Deployment time",
    numeral: "<10",
    supportingSentence: "Minutes from arrival to operational surveillance.",
  },
  {
    label: "Area coverage",
    numeral: "700+",
    supportingSentence:
      "Square kilometers of mission area from a single takeoff point.",
  },
  {
    label: "Target detection range",
    numeral: "1+",
    supportingSentence:
      "Kilometers, for automated threat and target detection.",
  },
  {
    label: "Payload swap time",
    numeral: "<5",
    supportingSentence:
      "Minutes to swap between thermal and optical payloads.",
  },
  {
    label: "Operating temperature",
    numeral: "5 to 45",
    supportingSentence:
      "Degrees Celsius operating range for diverse field climates.",
  },
];

export default function SentrivionSpecs() {
  return (
    <section className="relative bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <p className="label">Capability specifications</p>
        <h2 className="mt-3 text-heading font-display text-fg">
          Autonomous, all-weather field coverage
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Rapid deployment with continuous, docked operation.
        </p>
      </div>
      <PinnedSpecSheet panels={PANELS} className="mt-10" />
    </section>
  );
}
