"use client";

// Spec: pawaac-design-language-evolution — Task 11 (Autonomy_Page Section 3)
// Requirements: 4.1, 4.3, 5.1, 5.4, 8.4
// Design: design.md -> Page Specifications -> Autonomy_Page, Section 3
//         (Planning & dispatch logic)
//
// Persona: Both. This is a NEW component built for `/autonomy` — it does
// not modify `DecisionOS.tsx` (left untouched; still renders on the
// Homepage until task 16). It migrates DecisionOS.tsx's STEPS pipeline as
// an abstract flow diagram (Label_Caps step labels, Pattern 2), with one
// deliberate compliance change to the "command center mockup" sub-content:
//
// Requirement 8.4 (generalized beyond its Vision-AI-specific example, per
// task instructions — "a simulated or illustrative interface" applies
// generally): the mockup's status line and alert feed contained
// fabricated-sounding operational claims ("MISSION ACTIVE · 3 UNITS
// DEPLOYED", "Unit-02 reached waypoint" — specific unit counts/IDs implying
// real telemetry). This component:
//   1. Generalizes those specific-sounding claims to clearly illustrative
//      wording ("ILLUSTRATIVE MISSION VIEW" status line; "Waypoint
//      reached" alert entry with no specific unit ID or deployed-unit
//      count).
//   2. Adds the same persistent, always-visible, accessible
//      "illustrative/simulated" label pattern used in AutonomyVisionAI.tsx
//      — a non-animating <span> that is never aria-hidden, plus an
//      aria-label on the mockup region referencing the same text — since
//      this mockup-style live-status UI is kept in this section.
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  "Sensor Fusion",
  "Entity Analysis",
  "Persistent Tracking",
  "Operational Alert",
  "Decision & Planning",
  "Autonomous Action",
];

const ILLUSTRATIVE_LABEL = "Illustrative — simulated, not live footage";

// Generalized alert copy: no specific unit ID (Requirement 8.1) and no
// fabricated telemetry-sounding claim.
const ALERTS = ["Waypoint reached", "New entity classified: vehicle", "Patrol loop completed"];

export default function AutonomyDispatch() {
  return (
    <section className="bg-bg px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="label">From detection to dispatch</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            From detection to dispatch
          </h2>
          <p className="mt-4 text-body font-body text-muted">
            Detected events route to the right response path automatically.
          </p>
        </Reveal>

        {/* Abstract flow diagram — Label_Caps step labels (Pattern 2) */}
        <div className="relative mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08 }}
              className="border border-line bg-surface p-4"
            >
              <span className="font-mono text-2xl font-semibold text-white">{i + 1}</span>
              <p className="mt-2 text-sm text-fg">{s}</p>
            </motion.div>
          ))}
        </div>

        {/* Command-center mockup sub-content — generalized status/alert
            copy, always-visible accessible illustrative label
            (Requirement 8.4). */}
        <Reveal y={40} className="mt-16">
          <div
            className="overflow-hidden rounded-sm border border-line bg-bg-2"
            role="img"
            aria-label={ILLUSTRATIVE_LABEL}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] text-muted">
              <span className="text-fg">PAWAAC DECISION OS</span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-fg" />
                ILLUSTRATIVE MISSION VIEW
              </span>
            </div>
            <div className="grid gap-px bg-line md:grid-cols-[2fr_1fr]">
              {/* Map */}
              <div className="relative h-72 bg-bg">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(#8a8a8a 1px,transparent 1px),linear-gradient(90deg,#8a8a8a 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <span aria-hidden="true" className="absolute left-[40%] top-[45%] h-3 w-3 animate-pulse-dot rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
                <span aria-hidden="true" className="absolute left-[65%] top-[60%] h-2 w-2 rounded-full bg-fg" />
                <span aria-hidden="true" className="absolute left-[25%] top-[70%] h-2 w-2 rounded-full bg-fg" />
              </div>
              {/* Sidebar */}
              <div className="bg-bg p-4">
                <p className="label mb-3">Alert Feed</p>
                {ALERTS.map((a, i) => (
                  <p key={i} className="mb-2 font-mono text-[11px] text-muted">
                    <span aria-hidden="true" className="text-fg">●</span> {a}
                  </p>
                ))}
                {/*
                  Requirement 8.4 compliance fix: persistent, non-animating,
                  never-aria-hidden label — always visible whenever this
                  mockup is shown, part of the normal accessible text flow.
                */}
                <p className="mt-4 font-mono text-[10px] text-muted">
                  {ILLUSTRATIVE_LABEL}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
