"use client";

import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";

const STEPS = [
  "Draw your patrol route on the map",
  "Hit Go, the drone flies itself",
  "AI watches every frame, detects anomalies",
  "Instant alerts sent to your command post",
];

export default function Simplicity() {
  return (
    <section className="bg-bg-2 px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <Reveal y={0}>
          <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-[radial-gradient(circle_at_30%_30%,#181818,#080808)]">
            <span className="absolute left-3 top-3 bg-white px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-black">
              PAWAAC Simplicity
            </span>
            {/* Stylized "draw a route" map placeholder */}
            <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 225">
              <path
                d="M40 180 Q120 60 200 120 T360 50"
                fill="none"
                stroke="#ededed"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle cx="40" cy="180" r="5" fill="#ffffff" />
              <circle cx="360" cy="50" r="5" fill="#ededed" />
            </svg>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionMark index="03" label="Revolutionary Simplicity" />
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-fg md:text-5xl">
              If you know how to use a phone, you can fly PAWAAC drones.
            </h2>
          </Reveal>

          <div className="mt-10 space-y-5">
            {STEPS.map((s, i) => (
              <Reveal key={s} delay={i * 0.1} className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fg/60 font-mono text-sm text-fg">
                  {i + 1}
                </span>
                <p className="text-fg">{s}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <a
              href="#vision-ai"
              className="group mt-10 inline-flex items-center gap-2 font-mono text-sm text-fg"
            >
              See it live
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
