"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 2)
// Requirements: 4.1, 4.3, 4.4
// Design: design.md -> Page Specifications -> Homepage, Section 2
//         (Field-readiness spec sheet); Shared Components -> Pinned_Spec_Sheet
//
// Persona: Defense_Police_Persona.
//
// Site-owner-delegated resolution of OCP-02 (no new Change_Proposal
// approval fabricated): the site owner has explicitly said not to publish
// other-drone-line mission/uptime-style figures (e.g. "missions flown",
// "uptime %") since Pawaac hasn't sold its own USPs yet. Rather than
// leaving this panel as an indefinite "Pending confirmation" placeholder,
// this panel is repurposed to surface REAL, already-published hardware
// numerals that already appear on /product/hawkai (HawkAISpecs.tsx) and
// /product/sentrivion (SentrivionSpecs.tsx) — no new fact is disclosed
// here beyond what those two sub-pages already publish verbatim from the
// HawkAI Plus and Sentrivion brochures. These are confirmed ENGINEERING
// SPECS, not field-deployment/mission statistics, and the supporting
// sentence below is worded to make that distinction explicit.
import PinnedSpecSheet, { SpecPanel } from "@/components/ui/PinnedSpecSheet";

const PANELS: SpecPanel[] = [
  {
    label: "Endurance (thermal)",
    numeral: "80+",
    supportingSentence: "Minutes of flight time, HawkAI Plus thermal payload.",
  },
  {
    label: "Operational range",
    numeral: "15",
    supportingSentence: "Kilometers, HawkAI Plus with antenna extension.",
  },
  {
    label: "Deployment time",
    numeral: "<10",
    supportingSentence: "Minutes from arrival to operational, Sentrivion.",
  },
  {
    label: "Area coverage",
    numeral: "700+",
    supportingSentence: "Square kilometers per takeoff point, Sentrivion.",
  },
  {
    label: "Wind resistance",
    numeral: "45",
    supportingSentence: "Knots of all-weather resistance, HawkAI Plus.",
  },
  {
    label: "Payload swap time",
    numeral: "<5",
    supportingSentence: "Minutes to swap thermal/optical payloads, Sentrivion.",
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
          Built for demanding environments
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Confirmed HawkAI Plus and Sentrivion platform specs — not
          field-deployment or mission stats.
        </p>
      </div>
      <PinnedSpecSheet panels={PANELS} className="mt-10" />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-4">
        <a
          href="/product"
          className="group inline-flex items-center gap-2 font-mono text-sm text-fg"
        >
          See full specifications
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
