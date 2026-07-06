"use client";

// Spec: pawaac-design-language-evolution — Task 11 (Autonomy_Page Section 2)
// Requirements: 4.1, 4.3, 5.1, 5.4, 8.4
// Design: design.md -> Page Specifications -> Autonomy_Page, Section 2
//         (Vision AI illustrative overlay)
//
// Persona: Defense_Police_Persona. This is a NEW component built for the
// `/autonomy` route — it does not modify `VisionAI.tsx` (that file is left
// untouched; it still renders on the Homepage until task 16). This
// component reuses the visual PATTERN of VisionAI.tsx's detection overlay
// as inspiration only, with the following deliberate compliance changes:
//
// 1. (Requirement 8.4) The "illustrative/simulated" label is no longer a
//    fading, absolutely-positioned caption. It is rendered as a persistent
//    <span> that never animates, never opacity-cycles, and is never
//    aria-hidden — its plain text content ("Illustrative — simulated, not
//    live footage") is always part of the DOM's normal accessible-name/
//    text-content flow. The whole overlay region additionally carries
//    `aria-label` referencing this exact text (belt-and-suspenders: an
//    aria-label on the region PLUS a visually-persistent, non-hidden text
//    node with the same message), so assistive technology users get the
//    disclosure regardless of visual position or focus.
// 2. (Requirement 5.4) The BOXES array's fabricated confidence percentages
//    (96.4%, 94.2%, 88.7% in the original) are removed entirely — no
//    confidence number is displayed anywhere. Only the bounding-box shape
//    and category label (PERSONNEL/VEHICLE/ANOMALY) remain, as illustrative
//    shapes only.
// 3. (Requirement 8.1) The ALERTS array's "Border intrusion detected · Zone
//    4B" (a specific-sounding claim) is generalized to "Perimeter anomaly
//    detected · Zone 4B" — clearly illustrative/generic rather than
//    implying a real logged incident. Timestamps are kept as illustrative
//    mockup data (already non-specific), consistent with an
//    explicitly-labeled simulated interface.
//
// The "Sensing / Processing / Intelligence" pipeline cards are migrated in
// as supporting sub-content within this section (design.md does not list
// them as their own section), kept as secondary-disclosure detail per
// Requirement 4.2 — their own short copy is unaffected by the 60/140-char
// caps, which apply only to the SECTION's own headline/supporting sentence.
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

const ILLUSTRATIVE_LABEL = "Illustrative — simulated, not live footage";

// No confidence percentage field: illustrative bounding-box shapes only
// (Requirement 5.4 — no fabricated/unverified operational claims).
const BOXES = [
  { x: "12%", y: "30%", w: "22%", h: "34%", label: "PERSONNEL", color: "#8f8f8f" },
  { x: "58%", y: "44%", w: "26%", h: "30%", label: "VEHICLE", color: "#8f8f8f" },
  { x: "40%", y: "16%", w: "18%", h: "22%", label: "ANOMALY", color: "#ffffff" },
];

// Generalized, clearly-illustrative alert copy (Requirement 8.1) — no
// specific-sounding incident claims.
const ALERTS = [
  { t: "⚠", msg: "Perimeter anomaly detected · Zone 4B", time: "14:32:01", color: "text-white font-semibold" },
  { t: "✓", msg: "Route cleared · 2 vehicles", time: "14:30:55", color: "text-muted" },
  { t: "⚑", msg: "Unusual movement · Personnel: 7", time: "14:29:12", color: "text-fg" },
];

const CARDS = [
  { h: "Sensing", b: "EO/IR + thermal capture at the edge, frame-by-frame." },
  { h: "Processing", b: "On-board inference, low-latency by design." },
  { h: "Intelligence", b: "Detections are reasoned into named categories." },
];

export default function AutonomyVisionAI() {
  return (
    <section id="autonomy-vision-ai" className="bg-bg px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label justify-center">How detection works</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            How detection works
          </h2>
          <p className="mt-4 text-body font-body text-muted">
            An illustrative view of the onboard detection pipeline.
          </p>
        </Reveal>

        <Reveal y={40} className="mt-14 grid gap-4 lg:grid-cols-[1fr_300px]">
          {/* Feed + detection sim, wrapped in Reticle_Frame (Pattern 4) per
              design.md. `aria-label` gives assistive technology the
              illustrative disclosure at the region level, in addition to
              the always-visible <span> below (Requirement 8.4). */}
          <div
            className="relative aspect-video overflow-hidden rounded-sm border border-line bg-[radial-gradient(circle_at_60%_40%,#161616,#070707)]"
            role="img"
            aria-label={ILLUSTRATIVE_LABEL}
          >
            <ReticleFrame variant="dark" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#8a8a8a 1px,transparent 1px),linear-gradient(90deg,#8a8a8a 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {BOXES.map((b, i) => (
              <motion.div
                key={b.label}
                aria-hidden="true"
                className="absolute"
                style={{ left: b.x, top: b.y, width: b.w, height: b.h, borderColor: b.color, borderWidth: 1 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, repeatDelay: 1 }}
              >
                <span
                  className="absolute -top-5 left-0 whitespace-nowrap px-1 font-mono text-[10px]"
                  style={{ color: b.color, background: "rgba(0,0,0,0.6)" }}
                >
                  {b.label}
                </span>
              </motion.div>
            ))}
            {/*
              Requirement 8.4 compliance fix: this label is a persistent,
              non-animating, non-opacity-cycling <span>. It is never
              aria-hidden and is always rendered whenever the overlay is
              shown — its text content is part of the normal accessible
              text flow, not dependent on visual position, hover, or focus.
            */}
            <span className="absolute bottom-2 left-0 right-0 z-10 text-center font-mono text-[10px] text-muted">
              {ILLUSTRATIVE_LABEL}
            </span>
          </div>

          {/* Alert sidebar */}
          <div className="rounded-sm border border-line bg-surface/70 p-4 backdrop-blur-md">
            <div className="mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-fg" />
              <span className="font-mono text-[11px] tracking-widest text-fg">
                ILLUSTRATIVE ALERTS
              </span>
            </div>
            <div className="space-y-3">
              {ALERTS.map((a, i) => (
                <motion.div
                  key={a.msg}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.4 }}
                  className="border-l-2 pl-2 font-mono text-[11px] leading-relaxed"
                  style={{ borderColor: "var(--color-line)" }}
                >
                  <span className={a.color}>{a.t} </span>
                  <span className="text-fg">{a.msg}</span>
                  <div className="text-muted">{a.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Pipeline cards — secondary-disclosure sub-content under Section 2
            (Requirement 4.2); their short copy is not subject to the
            section's own 60/140-char headline/supporting-sentence caps. */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.h} delay={i * 0.1}>
              <div className={`h-full bg-surface p-6 ${i === 0 ? "border-l-2 border-fg/50" : "border border-line"}`}>
                <p className="label mb-2">{`0${i + 1}`}</p>
                <h3 className="font-display text-xl font-semibold text-fg">{c.h}</h3>
                <p className="mt-2 text-sm text-muted">{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
