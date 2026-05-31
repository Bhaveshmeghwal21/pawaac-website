"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HEADLINE = ["Aerial", "security", "layer", "for", "the", "physical", "world."];

function HudRow({ k, v, color = "text-fg" }: { k: string; v: string; color?: string }) {
  return (
    <div className="flex items-center justify-between border-t border-line/60 py-1.5 font-mono text-[12px]">
      <span className="text-muted">{k}</span>
      <span className={color}>{v}</span>
    </div>
  );
}

export default function Hero() {
  const [alt, setAlt] = useState(120);
  const [spd, setSpd] = useState(72);
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
      className="relative flex h-[100dvh] w-full items-end overflow-hidden bg-bg"
    >
      {/* Fallback ambient backdrop (until hero footage is provided) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#15171c_0%,#080808_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 40%,#000,transparent 75%)",
        }}
      />
      {/* Drone footage — drops in when /videos assets exist */}
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,8,8,0.3),rgba(8,8,8,0.8))]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 pb-24">
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-fg md:text-7xl lg:text-8xl">
          {HEADLINE.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.06 }}
              className="mr-3 inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 max-w-md text-lg text-muted"
        >
          Fully autonomous drones. No pilots. 24×7 surveillance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="bg-red px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Schedule Demo →
          </a>
          <a
            href="#technology"
            className="border border-fg/30 px-6 py-3 text-sm font-semibold text-fg transition hover:bg-fg/10"
          >
            Watch in Action ▶
          </a>
        </motion.div>
      </div>

      {/* HUD card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute right-6 top-24 z-10 hidden w-[280px] border border-line bg-surface/80 p-4 backdrop-blur-md lg:block"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green" />
          <span className="font-mono text-[10px] tracking-widest text-green">
            LIVE FEED: ACTIVE
          </span>
        </div>
        <div className="mt-3">
          <HudRow k="ALTITUDE" v={`${alt}m AGL`} />
          <HudRow k="SPEED" v={`${spd} km/h`} />
          <HudRow k="COVERAGE" v="Active" color="text-green" />
          <HudRow
            k="AI STATUS"
            v={alert ? "ALERT" : "MONITORING"}
            color={alert ? "text-red" : "text-green"}
          />
        </div>
        <p className="mt-3 font-mono text-[9px] leading-relaxed text-muted">
          CLASSIFIED FEED — AUTHORIZED ACCESS ONLY
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1">
        <span className="label text-[10px]">SCROLL</span>
        <span className="animate-bounce-down text-fg">↓</span>
      </div>
    </section>
  );
}
