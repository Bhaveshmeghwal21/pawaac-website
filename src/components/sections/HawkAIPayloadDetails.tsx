"use client";

// Spec: pawaac-design-language-evolution — Task 66 (HawkAI Plus Sub-Page Section 3)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4, 9.6
// Design: design.md -> Page Specifications -> HawkAI Plus Product Sub-Page,
//         Section 3 (Payload & sensor specifications)
//
// Persona: Both. This is a secondary-disclosure Technical_Data table (per
// design.md's `secondaryDisclosure` model), NOT a new headline/section
// under the 60/140-char rule — it renders as a small "Payload and sensor
// specifications" label above a data table/grid, reusing the site's
// `.technical-data` styling, positioned directly beneath Section 2's
// Pinned_Spec_Sheet. All figures below are transcribed verbatim from the
// HawkAI Plus product brochure and MUST NOT be altered.
//
// No specific encryption standard is named in the source brochure — do NOT
// add one here or anywhere on this page until the site owner confirms a
// specific standard.
import Reveal from "@/components/ui/Reveal";

type PayloadSpec = {
  title: string;
  rows: string[];
};

const PAYLOADS: PayloadSpec[] = [
  {
    title: "Thermal Surveillance Pod",
    rows: [
      "640 × 512 IR sensor",
      "8–14 μm thermal band at 30 Hz",
      "Detection range up to 1100 m",
      "Laser rangefinder 5 m–1000 m (±1 m accuracy)",
      "AI target lock & track",
      "IP54 rated",
      "3-axis gimbal stabilization",
    ],
  },
  {
    title: "Optical Pod Camera",
    rows: [
      "4 MP CMOS sensor",
      "HDR imaging",
      "Starlight low-light capability",
      "10x optical / 30x hybrid zoom (10x optical + 3x digital)",
      "2K recording (2560×1440 @ 30fps)",
      "Detection range up to 1200 m",
      "3-axis gimbal stabilization",
    ],
  },
];

export default function HawkAIPayloadDetails() {
  return (
    <section className="relative bg-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="technical-data">Payload &amp; sensor specifications</p>
          <p className="mt-4 max-w-2xl text-body font-body text-muted">
            Interchangeable thermal and optical payloads, swapped in under 30
            seconds, tool-free.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {PAYLOADS.map((payload) => (
            <div key={payload.title} className="bg-bg p-8">
              <h3 className="font-display text-lg font-semibold text-fg">
                {payload.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {payload.rows.map((row) => (
                  <li
                    key={row}
                    className="technical-data border-t border-line pt-2 text-muted first:border-t-0 first:pt-0"
                  >
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-2 border-t border-line pt-6">
            <span className="technical-data text-muted">
              Payload swap time: ~30 seconds, tool-free
            </span>
            <span className="technical-data text-muted">
              Flight compatibility: MAVLink / ArduPilot / PX4
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
