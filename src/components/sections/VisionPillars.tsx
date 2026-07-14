"use client";

// Spec: pawaac-design-language-evolution — Commitments_Page restructure
// (resolves OCP-20 alongside VisionHero/VisionIntro/CommitmentsPrinciples)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Commitments_Page ("Our
//         Vision & Commitments"), Section 3 (Vision pillars)
//
// Persona: Both. Founder-authored copy (verbatim, resolves OCP-20's
// vision-pillar framing) — every sentence/claim below is reproduced
// exactly as approved. Reuses the existing label + description card
// pattern already used by AutonomySafeguards.tsx / CommitmentsPrinciples.tsx
// (Technical_Data rule-list styling, Pattern 2), with a 2-column layout
// since each description here is a full paragraph rather than a
// one-line stub.
import Reveal from "@/components/ui/Reveal";

const PILLARS = [
  {
    label: "Autonomy, not remote control",
    description:
      "A remote-controlled drone is still a tool that needs a trained operator's full attention for as long as it's in the air. We think that's the wrong long-term shape for the technology. Every system we build is designed to take on more of the sensing, tracking, and routine-decision workload itself — under human-set rules and with a human always able to step in — so that one operator can responsibly oversee more ground, not just one aircraft.",
  },
  {
    label: "Built for the field, not the demo booth",
    description:
      "It's easy to make a drone look impressive in a controlled demo. It's harder to make one that still works after the fortieth flight in bad wind, in the heat, with a dock that's had dust blown into it for a month. We test for the deployment, not the pitch — endurance, wind resistance, and automated dock-and-recharge cycles are core requirements from day one, not features bolted on later.",
  },
  {
    label: "India-engineered, field-first",
    description:
      "Pawaac is engineered and operated out of India. We're building for the environments and mission profiles that matter to the operators we're designing for first: defense, police, and critical-infrastructure teams who need a platform that's dependable in the field, not just on paper.",
  },
  {
    label: "A platform, not just two products",
    description:
      "HawkAI Plus and Sentrivion share the same underlying autonomy stack — the same sensing, decision, and dispatch logic runs underneath both airframes. That's deliberate. As we grow, new hardware plugs into a platform we already trust, instead of starting from zero each time.",
  },
];

export default function VisionPillars() {
  return (
    <section className="relative bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto max-w-7xl">
        <p className="label text-[#6b6b6b]">Vision</p>
        <h2 className="mt-3 text-heading font-display text-[#080808]">
          What we&apos;re building toward
        </h2>

        {/* Technical_Data rule-list styling (Pattern 2), same card
            pattern as AutonomySafeguards.tsx / CommitmentsPrinciples.tsx,
            2-column since each description is a full paragraph. */}
        <ul className="mt-12 grid gap-px border border-[#d6d6d6] bg-[#d6d6d6] sm:grid-cols-2">
          {PILLARS.map((item) => (
            <li key={item.label} className="bg-white p-8">
              <Reveal>
                <p className="technical-data text-[#080808]">{item.label}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#454545]">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
