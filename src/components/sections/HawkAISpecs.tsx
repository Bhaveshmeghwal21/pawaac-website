"use client";

// Spec: pawaac-design-language-evolution — Task 66 (HawkAI Plus Sub-Page Section 2)
// Requirements: 4.1, 4.3, 4.4, 7.2, 8.3
// Design: design.md -> Page Specifications -> HawkAI Plus Product Sub-Page,
//         Section 2 (Airframe & flight specifications)
//
// Persona: Defense_Police_Persona. Renders the Pinned_Spec_Sheet shell with
// the 6 REAL, brochure-confirmed numeral panels (resolved OCP-07 — see
// design.md's "Resolved Change Proposals" table). These exact figures are
// transcribed verbatim from the HawkAI Plus product brochure
// (public/images/HAWKAI PLUS UAV - Tactical Surveillance Platform.pdf) and
// MUST NOT be altered.
import PinnedSpecSheet, { SpecPanel } from "@/components/ui/PinnedSpecSheet";

const PANELS: SpecPanel[] = [
  {
    label: "Endurance (thermal payload)",
    numeral: "80+",
    supportingSentence:
      "Minutes of flight time with the thermal surveillance pod installed.",
  },
  {
    label: "Endurance (optical payload)",
    numeral: "60+",
    supportingSentence:
      "Minutes of flight time with the optical pod camera installed.",
  },
  {
    label: "Operational range",
    numeral: "15",
    supportingSentence:
      "Kilometers, with directional patch antenna range extension.",
  },
  {
    label: "Wind resistance",
    numeral: "45",
    supportingSentence:
      "Knots of all-weather wind resistance for demanding field conditions.",
  },
  {
    label: "All-up weight",
    numeral: "2.4",
    supportingSentence: "Kilograms, without payload.",
  },
  {
    label: "Service ceiling",
    numeral: "4000",
    supportingSentence: "Meters AMSL maximum service ceiling.",
  },
];

export default function HawkAISpecs() {
  return (
    <section className="relative bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <p className="label">Airframe &amp; flight specifications</p>
        <h2 className="mt-3 text-heading font-display text-fg">
          Built for extended field operations
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Long endurance, extended range, and all-weather reliability.
        </p>
      </div>
      <PinnedSpecSheet panels={PANELS} className="mt-10" />
    </section>
  );
}
