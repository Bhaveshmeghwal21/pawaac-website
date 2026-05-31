"use client";

import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import SectionMark from "@/components/ui/SectionMark";

const PAINS = [
  {
    h: "Reactive, Not Proactive",
    b: "Incidents surface after the damage is done, rarely before.",
  },
  {
    h: "Manpower Doesn't Scale",
    b: "A patrol covers a few km² an hour. The perimeter doesn't shrink to match.",
  },
  {
    h: "Pilots Are the Bottleneck",
    b: "Conventional drones still need trained operators in the loop, around the clock.",
  },
];

type StatItem = {
  label: string;
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  sub: string;
  red: boolean;
};

const STATS: StatItem[] = [
  { label: "Borders & coastline", end: 22623, separator: ",", suffix: " km", sub: "to keep under watch", red: false },
  { label: "Ground patrol", end: 3, prefix: "~", suffix: " km²/hr", sub: "is all one team can cover", red: true },
  { label: "Threats operate", end: 24, suffix: "×7", sub: "your coverage has to as well", red: false },
  { label: "Real-time eyes", end: 30, prefix: "<", suffix: "%", sub: "of critical areas have them", red: true },
];

export default function Problem() {
  return (
    <section className="bg-bg-2 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionMark index="01" label="The Operational Reality" />
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-fg md:text-6xl">
            More ground to cover.
            <br />
            <span className="text-red">Fewer eyes</span> to do it.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {PAINS.map((p, i) => (
              <Reveal key={p.h} delay={i * 0.1} className="mb-8 border-l-2 border-red pl-4">
                <h3 className="text-[13px] font-bold uppercase tracking-wide text-fg">
                  {p.h}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.b}</p>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} y={40}>
                <div className="h-full border border-line bg-surface p-6">
                  <p className="label text-[10px]">{s.label}</p>
                  <Counter
                    end={s.end}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    separator={s.separator}
                    className={`mt-4 block font-mono text-4xl font-semibold md:text-5xl ${
                      s.red ? "text-red" : "text-fg"
                    }`}
                  />
                  <p className="mt-2 text-xs text-muted">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
