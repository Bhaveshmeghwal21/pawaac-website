"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";

const STEPS = [
  "Sensor Fusion",
  "Entity Analysis",
  "Persistent Tracking",
  "Operational Alert",
  "Decision & Planning",
  "Autonomous Action",
];

export default function DecisionOS() {
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = line.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
          end: "bottom 75%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-bg px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionMark index="05" label="Action Layer" />
          <h2 className="mt-3 font-display text-4xl font-bold text-fg md:text-6xl">
            Decision OS →
          </h2>
          <p className="mt-4 text-muted">
            Software that connects sensors, drones, and defense systems into a
            single AI-driven command network.
          </p>
        </Reveal>

        {/* Pipeline */}
        <div ref={container} className="relative mt-16">
          <svg
            className="absolute left-0 top-1/2 hidden h-2 w-full -translate-y-1/2 lg:block"
            viewBox="0 0 1000 10"
            preserveAspectRatio="none"
          >
            <path ref={line} d="M0 5 L1000 5" stroke="#e8202a" strokeWidth="2" fill="none" />
          </svg>

          <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08 }}
                className="border border-line bg-surface p-4"
              >
                <span className="font-mono text-2xl font-semibold text-red">{i + 1}</span>
                <p className="mt-2 text-sm text-fg">{s}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Command center mockup */}
        <Reveal y={40} className="mt-16">
          <div className="overflow-hidden rounded-sm border border-line bg-bg-2">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] text-muted">
              <span className="text-fg">PAWAAC DECISION OS</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green" />
                MISSION ACTIVE · 3 UNITS DEPLOYED
              </span>
            </div>
            <div className="grid gap-px bg-line md:grid-cols-[2fr_1fr]">
              {/* Map */}
              <div className="relative h-72 bg-bg">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <span className="absolute left-[40%] top-[45%] h-3 w-3 animate-pulse-dot rounded-full bg-red shadow-[0_0_12px_#e8202a]" />
                <span className="absolute left-[65%] top-[60%] h-2 w-2 rounded-full bg-green" />
                <span className="absolute left-[25%] top-[70%] h-2 w-2 rounded-full bg-green" />
              </div>
              {/* Sidebar */}
              <div className="bg-bg p-4">
                <p className="label mb-3">Alert Feed</p>
                {["Unit-02 reached waypoint", "New entity classified: vehicle", "Patrol loop completed"].map(
                  (a, i) => (
                    <p key={i} className="mb-2 font-mono text-[11px] text-muted">
                      <span className="text-green">●</span> {a}
                    </p>
                  )
                )}
                <p className="mt-4 font-mono text-[10px] text-muted">
                  Command Center Interface (Beta)
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
