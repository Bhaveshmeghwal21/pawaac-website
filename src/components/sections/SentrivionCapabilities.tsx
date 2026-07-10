"use client";

// Spec: pawaac-design-language-evolution — Task 67 (Sentrivion Sub-Page Section 3)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4, 9.6
// Design: design.md -> Page Specifications -> Sentrivion Product Sub-Page,
//         Section 3 (Autonomy & AI capabilities)
//
// Persona: Both. Secondary-disclosure Technical_Data rule-list (per
// design.md's `secondaryDisclosure` model), positioned beneath Section 2's
// Pinned_Spec_Sheet. All items below are transcribed from the Sentrivion
// product brochure and MUST NOT be altered. The two relative claims from
// the brochure ("up to 100% lighter than other drones in its class",
// "built for over 500 surveillance missions") appear ONLY as descriptive
// prose here, never as a Pinned_Spec_Sheet numeral, per design.md's
// caveat.
//
// No specific encryption standard is named in the source brochure — do NOT
// add one here or anywhere on this page until the site owner confirms a
// specific standard.
import Reveal from "@/components/ui/Reveal";

const CAPABILITIES = [
  "No-pilot autonomous operation (waypoint-based mission planning)",
  "24×7 automated docking: charging, weather-proof housing, instant redeployment",
  "AI vision: real-time anomaly/threat detection (fire, intrusion, crowd incidents, theft, abandoned objects)",
  "Encrypted communication with local video storage",
  "VTOL capable (no runway/launch gear required)",
  "Manual override mode available",
];

export default function SentrivionCapabilities() {
  return (
    <section className="relative bg-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="technical-data">Autonomy &amp; AI capabilities</p>
          <p className="mt-4 max-w-2xl text-body font-body text-muted">
            No-pilot, always-on operation with real-time AI threat detection
            and automated docking.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <li key={item} className="bg-bg p-6">
              <p className="technical-data text-muted">{item}</p>
            </li>
          ))}
        </ul>

        {/* Relative brochure claims — descriptive prose only, never a
            Pinned_Spec_Sheet numeral, per design.md's caveat on this
            page's Section 2. */}
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl border-t border-line pt-6 text-body font-body text-muted">
            Built for over 500 surveillance missions, and engineered up to
            100% lighter than other drones in its class.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
