"use client";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page Section 2)
// Requirements: 4.1, 4.3, 4.4
// Design: design.md -> Page Specifications -> Product_Page, Section 2
//         (Specifications); Shared Components -> Pinned_Spec_Sheet
//
// Persona: Defense_Police_Persona. Renders the Pinned_Spec_Sheet shell with
// `numeral: ""` on every panel so each panel renders the "Pending
// confirmation" Technical_Data placeholder (Requirement 7.2, 8.3) rather
// than any of the numeral-sounding figures previously hardcoded in
// DroneShowcase.tsx (e.g. "72 km/h cruise", "120m AGL ceiling", "IP65
// housing", "2 Hour Endurance", "<10 min deploy", "30x Optical Zoom").
// Those figures are gated by OCP-07 and are intentionally NOT reproduced
// here, even as body copy — the supporting sentences below describe
// capability in general terms only, with no numeral or unit-bearing claim.
import PinnedSpecSheet, { SpecPanel } from "@/components/ui/PinnedSpecSheet";

// Labels reuse DroneShowcase's existing SPECS category names ("Technical",
// "User Experience", "Autonomy"); every `numeral` stays empty and every
// `supportingSentence` is reframed as a general capability statement with
// no confirmed figure, per OCP-07 gating.
const PANELS: SpecPanel[] = [
  {
    label: "Technical",
    numeral: "",
    supportingSentence:
      "A purpose-built airframe engineered for continuous outdoor field operation.",
  },
  {
    label: "User Experience",
    numeral: "",
    supportingSentence:
      "Draw-and-go mission planning designed for operators without a pilot license.",
  },
  {
    label: "Autonomy",
    numeral: "",
    supportingSentence:
      "Full autonomous flight, including GPS-denied navigation and automatic docking.",
  },
];

export default function ProductSpecifications() {
  return (
    <section className="relative bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <h2 className="text-heading font-display text-fg">Specifications</h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Confirmed figures only; unconfirmed specs are withheld pending approval.
        </p>
      </div>
      <PinnedSpecSheet panels={PANELS} className="mt-10" />
    </section>
  );
}
