"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// headline as deliberately mis-aligned lines that break the grid
const LINES = [
  { t: "AERIAL", ml: "0vw" },
  { t: "SECURITY LAYER", ml: "7vw" },
  { t: "FOR THE PHYSICAL", ml: "2.5vw" },
  { t: "WORLD.", ml: "12vw" },
];

const CORNERS = [
  "left-[-1px] top-[-1px] border-l border-t",
  "right-[-1px] top-[-1px] border-r border-t",
  "left-[-1px] bottom-[-1px] border-l border-b",
  "right-[-1px] bottom-[-1px] border-r border-b",
];

function HudRow({
  k,
  v,
  unit,
  color = "text-fg",
}: {
  k: string;
  v: string;
  unit?: string;
  color?: string;
}) {
  return (
    <div className="flex items-end justify-between border-t border-line/60 py-1.5 font-mono text-[12px]">
      <span className="text-muted">{k}</span>
      <span className={color}>
        {v}
        {unit && <span className="ml-1 text-[9px] text-muted">{unit}</span>}
      </span>
    </div>
  );
}

export default function Hero() {
  const [alt, setAlt] = useState(128);
  const [spd, setSpd] = useState(71);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setAlt(115 + Math.floor(Math.random() * 15));
      setSpd(68 + Math.floor(Math.random() * 7));
      setAlert(Math.random() < 0.05);
    }, 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="top"
      data-cursor="crosshair"
      className="relative h-[100dvh] w-full overflow-hidden bg-bg"
    >
      {/* ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,#181818_0%,#080808_70%)]" />
      {/* drone footage drops in when /videos assets exist */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero_poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero_web.webm" type="video/webm" />
        <source src="/videos/hero_web.mp4" type="video/mp4" />
      </video>
      {/* directional scrim, heavier on the left where type sits */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.93)_0%,rgba(8,8,8,0.55)_55%,rgba(8,8,8,0.3)_100%)]" />

      {/* exposed engineering grid */}
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-7xl px-6">
        <div className="grid h-full grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-line/25 first:border-line/50" />
          ))}
        </div>
      </div>

      {/* giant section-index watermark */}
      <span className="pointer-events-none absolute left-3 top-[12%] select-none font-display text-[24vw] font-bold leading-none text-fg/[0.035] md:left-10">
        00
      </span>

      {/* content, anchored to the lower-left rail */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
        {/* index marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute left-6 top-24 flex items-center gap-3 md:top-28"
        >
          <span className="font-mono text-[11px] tracking-widest text-fg">[ 00 ]</span>
          <span className="h-px w-8 bg-fg/40" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Aerial Autonomy Systems
          </span>
        </motion.div>

        {/* mis-aligned headline */}
        <h1 className="-ml-1 font-display text-[8vw] font-bold uppercase leading-[0.92] text-fg md:-ml-2 md:text-[6.2vw] lg:text-[5.4vw]">
          {LINES.map((l, i) => (
            <motion.span
              key={l.t}
              initial={{ opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginLeft: l.ml }}
              className="block"
            >
              {l.t === "WORLD." ? (
                <>
                  WORLD<span className="text-white">.</span>
                </>
              ) : (
                l.t
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ marginLeft: "2.5vw" }}
          className="mt-7 max-w-md font-mono text-sm leading-relaxed text-muted"
        >
          Fully autonomous drones. No pilots. 24×7 surveillance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ marginLeft: "2.5vw" }}
          className="mt-8 flex w-fit flex-wrap gap-px bg-line"
        >
          <a
            href="/contact"
            className="bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-interactive"
          >
            Schedule Demo →
          </a>
          <a
            href="/autonomy"
            className="bg-bg px-7 py-3.5 text-sm font-semibold text-fg transition hover:bg-surface"
          >
            Watch in Action ▶
          </a>
        </motion.div>
      </div>

      {/* bracketed telemetry cell, deliberately off-grid right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="absolute right-6 top-[28%] z-10 hidden w-[260px] lg:block"
      >
        <div className="relative border border-line bg-surface/60 p-5 backdrop-blur-md">
          {CORNERS.map((c) => (
            <span key={c} className={`absolute h-2.5 w-2.5 border-fg/60 ${c}`} />
          ))}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-fg" />
              <span className="font-mono text-[10px] tracking-widest text-fg">LIVE FEED</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-muted">FT-01</span>
          </div>
          <div className="mt-4">
            <HudRow k="ALTITUDE" v={`${alt}`} unit="m AGL" />
            <HudRow k="SPEED" v={`${spd}`} unit="km/h" />
            <HudRow k="COVERAGE" v="ACTIVE" color="text-fg" />
            <HudRow
              k="AI STATUS"
              v={alert ? "ALERT" : "MONITORING"}
              color={alert ? "text-white font-semibold" : "text-muted"}
            />
          </div>
          <p className="mt-4 font-mono text-[9px] leading-relaxed text-muted">
            CLASSIFIED FEED · AUTHORIZED ACCESS ONLY
          </p>
        </div>
      </motion.div>

      {/* scroll cue, off-center bottom-left */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
        <span className="animate-bounce-down text-fg">↓</span>
        <span className="label text-[10px]">SCROLL TO ENGAGE</span>
      </div>
    </section>
  );
}
