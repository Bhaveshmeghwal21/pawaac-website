"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const BOXES = [
  { x: "12%", y: "30%", w: "22%", h: "34%", label: "PERSONNEL", conf: "96.4%", color: "#00ff88" },
  { x: "58%", y: "44%", w: "26%", h: "30%", label: "VEHICLE", conf: "94.2%", color: "#00ff88" },
  { x: "40%", y: "16%", w: "18%", h: "22%", label: "ANOMALY", conf: "88.7%", color: "#e8202a" },
];

const ALERTS = [
  { t: "⚠", msg: "Border intrusion detected — Zone 4B", time: "14:32:01", color: "text-red" },
  { t: "✓", msg: "Convoy route cleared — 2 vehicles", time: "14:30:55", color: "text-green" },
  { t: "⚑", msg: "Unusual movement — Personnel: 7", time: "14:29:12", color: "text-blue" },
];

const CARDS = [
  { h: "Sensing", b: "EO/IR + thermal capture at the edge, frame-by-frame." },
  { h: "Processing", b: "RT-DETR & YOLO inference on-board, sub-100ms." },
  { h: "Intelligence", b: "LLM reasoning turns detections into named threats." },
];

export default function VisionAI() {
  return (
    <section id="vision-ai" className="bg-bg px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label text-red">Part 2 — Perception Layer</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-fg md:text-6xl">
            Vision AI →
          </h2>
          <p className="mt-4 text-muted">
            Define anything you want to detect. Our models find it in real time
            using RT-DETR, YOLO, and LLM-based reasoning.
          </p>
        </Reveal>

        <Reveal y={40} className="mt-14 grid gap-4 lg:grid-cols-[1fr_300px]">
          {/* Feed + detection sim */}
          <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-[radial-gradient(circle_at_60%_40%,#13151a,#070707)]">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {BOXES.map((b, i) => (
              <motion.div
                key={b.label}
                className="absolute"
                style={{ left: b.x, top: b.y, width: b.w, height: b.h, borderColor: b.color, borderWidth: 1 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, repeatDelay: 1 }}
              >
                <span
                  className="absolute -top-5 left-0 whitespace-nowrap px-1 font-mono text-[10px]"
                  style={{ color: b.color, background: "rgba(0,0,0,0.6)" }}
                >
                  {b.label} {b.conf}
                </span>
              </motion.div>
            ))}
            <span className="absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] text-muted">
              SIMULATED INTERFACE — Real-time performance varies by deployment
            </span>
          </div>

          {/* Alert sidebar */}
          <div className="rounded-sm border border-line bg-surface/70 p-4 backdrop-blur-md">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green" />
              <span className="font-mono text-[11px] tracking-widest text-green">
                LIVE ALERTS
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

        {/* Pipeline cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.h} delay={i * 0.1}>
              <div className={`h-full bg-surface p-6 ${i === 0 ? "border-l-2 border-red" : "border border-line"}`}>
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
