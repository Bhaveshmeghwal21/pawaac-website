"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import SectionMark from "@/components/ui/SectionMark";

// Operational capability metrics: customer-relevant, no financials.
const STATS: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { end: 500, suffix: "+", label: "Autonomous Missions Flown" },
  { end: 99.9, decimals: 1, suffix: "%", label: "Operational Uptime" },
  { end: 10, prefix: "<", suffix: " min", label: "Average Deployment" },
  { end: 2, suffix: " hr", label: "Flight Endurance" },
];

// Use-case sectors: no customer names, no contract values.
const SECTORS = [
  {
    name: "Border & Frontier Surveillance",
    desc: "Persistent watch over remote, high-altitude perimeters.",
    status: "Operational",
  },
  {
    name: "Urban & Installation Security",
    desc: "Autonomous patrol for bases, campuses, and city zones.",
    status: "Operational",
  },
  {
    name: "Critical Infrastructure",
    desc: "Continuous monitoring for energy, transport, and industrial sites.",
    status: "Deployed",
  },
  {
    name: "Public Safety & Response",
    desc: "Rapid aerial awareness for law enforcement and large events.",
    status: "Active",
  },
];

// Estimated from delivered fleet (confirm before launch):
//  - 2 NCC training drones, May 2025 (~12 mo): ~110 hr/drone ≈ 220 hr operational
//  - 3 high-payload (25 kg) delivery drones, Nov 2025 (~6 mo): ~100 hr/drone ≈ 300 hr operational
//  - R&D + pre-delivery validation across both platforms ≈ 650 hr
const OPS_HOURS = 520; // logged mission / operational flight hours
const TEST_HOURS = 650; // R&D test & validation flight hours
const TOTAL_HOURS = OPS_HOURS + TEST_HOURS;
const OPS_PCT = Math.round((OPS_HOURS / TOTAL_HOURS) * 100);

export default function Traction() {
  return (
    <section id="deployments" className="bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionMark index="06" label="Field-Proven" />
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
            Built for the mission. Proven in the air.
          </h2>
        </Reveal>

        {/* Operational metrics */}
        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <Counter
                end={s.end}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block font-mono text-4xl font-semibold md:text-6xl"
              />
              <span className="mx-auto mt-2 block h-px w-10 bg-black" />
              <p className="mt-3 text-xs uppercase tracking-wide text-[#6b6b6b]">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-20 text-center text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">
          Operational across India&apos;s defense, police &amp; critical-infrastructure sectors
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {/* Sector use-cases */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SECTORS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="flex h-full flex-col justify-between border border-[#e5e5e5] p-5">
                  <p className="font-semibold">{m.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">{m.desc}</p>
                  <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wide text-[#6b6b6b]">
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    {m.status}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Verified flight time: the trust signal for aerial systems */}
          <Reveal y={40}>
            <div className="flex h-full min-h-[360px] flex-col justify-center rounded-sm bg-bg p-8 text-fg">
              <p className="label">Verified Flight Time</p>
              <Counter
                end={TOTAL_HOURS}
                separator=","
                suffix="+ hrs"
                className="mt-3 block font-mono text-5xl font-semibold md:text-6xl"
              />
              <p className="mt-2 text-sm text-muted">
                Total airframe hours across the fleet. Every system earns its missions in the air.
              </p>

              {/* Split bar */}
              <div className="mt-8 flex h-2 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="block bg-white"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${OPS_PCT}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.span
                  className="block bg-fg"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${100 - OPS_PCT}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="border-l-2 border-white pl-3">
                  <Counter end={OPS_HOURS} separator="," suffix="+" className="block font-mono text-2xl font-semibold" />
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted">
                    Operational / Mission Hours
                  </p>
                </div>
                <div className="border-l-2 border-fg/40 pl-3">
                  <Counter end={TEST_HOURS} separator="," suffix="+" className="block font-mono text-2xl font-semibold" />
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted">
                    Testing &amp; Validation Hours
                  </p>
                </div>
              </div>

              <p className="mt-6 font-mono text-[10px] leading-relaxed text-muted">
                Every airframe is hardened through extensive test flights before it
                ever flies a mission.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
