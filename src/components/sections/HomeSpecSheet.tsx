"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 2)
// Requirements: 4.1, 4.3, 4.4
// Design: design.md -> Page Specifications -> Homepage, Section 2
//         (Field-readiness spec sheet); Shared Components -> Pinned_Spec_Sheet
//
// Persona: Defense_Police_Persona. Renders the Pinned_Spec_Sheet shell
// with `numeral: ""` on every panel so each panel renders the "Pending
// confirmation" Technical_Data placeholder (Requirement 7.2, 8.3) rather
// than any real figure. OCP-02 (which numerals may be disclosed) stays
// open — this task does NOT populate real numerals (see Phase 4, task 41).
import PinnedSpecSheet, { SpecPanel } from "@/components/ui/PinnedSpecSheet";

const PANELS: SpecPanel[] = [
  {
    label: "Flight readiness",
    numeral: "",
    supportingSentence:
      "Hardware already flying real patrol missions, not a lab prototype.",
  },
  {
    label: "Autonomy",
    numeral: "",
    supportingSentence:
      "Detection, planning, and dispatch run onboard without a constant pilot link.",
  },
  {
    label: "Field operations",
    numeral: "",
    supportingSentence:
      "Docking, recharge, and redeploy cycles run without a human in the loop.",
  },
];

export default function HomeSpecSheet() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through behind the pinned
    // spec-sheet panels, while still keeping text-fg/text-muted readable.
    <section className="relative bg-bg/50">
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <p className="label">Defense &amp; police</p>
        <h2 className="mt-3 text-heading font-display text-fg">
          Field-proven, not a lab demo
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Every capability below ships on hardware already flying with real
          operators.
        </p>
      </div>
      <PinnedSpecSheet panels={PANELS} className="mt-10" />
    </section>
  );
}
