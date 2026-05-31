"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";

const DroneScene = dynamic(() => import("@/components/3d/DroneScene"), {
  ssr: false,
});

const HOTSPOTS = [
  { label: "30× Optical Zoom + Thermal", x: "78%", y: "22%" },
  { label: "Onboard AI Perception", x: "16%", y: "30%" },
  { label: "GPS-Denied Navigation", x: "14%", y: "64%" },
  { label: "2 Hour Endurance", x: "80%", y: "60%" },
  { label: "Auto Dock & Battery Swap", x: "50%", y: "84%" },
];

const SPECS = [
  { h: "Technical", items: ["e-VTOL airframe", "72 km/h cruise", "120m AGL ceiling", "IP65 housing"] },
  { h: "User Experience", items: ["Draw-and-go routing", "No pilot license", "<10 min deploy", "Phone-grade UI"] },
  { h: "Autonomy", items: ["Full autonomy", "GPS-denied nav", "Auto charge & dock", "Self-healing routes"] },
];

export default function DroneShowcase() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section id="technology" className="relative bg-bg">
      <div className="relative h-[180vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* 3D / fallback */}
          <div className="absolute inset-0" data-cursor="crosshair">
            {isMobile ? (
              <div className="flex h-full items-center justify-center">
                <div className="relative h-40 w-72 rounded-sm border border-line bg-[radial-gradient(circle,#15171c,#080808)]">
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-56 -translate-x-1/2 -translate-y-1/2 rounded bg-fg/20" />
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red" />
                </div>
              </div>
            ) : (
              <DroneScene />
            )}
          </div>

          {/* Hotspot annotations (desktop) */}
          {!isMobile &&
            HOTSPOTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.15 }}
                className="pointer-events-none absolute z-10 flex items-center gap-2"
                style={{ left: h.x, top: h.y }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red shadow-[0_0_8px_#e8202a]" />
                <span className="border border-line bg-surface/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-fg backdrop-blur-sm">
                  {h.label}
                </span>
              </motion.div>
            ))}

          {/* Heading */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
            <p className="label text-red">Autonomous e-VTOL Drone</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold text-fg md:text-6xl">
              Fully autonomous. Fully capable.
            </h2>
            <p className="mt-3 text-muted">Zero manual flight operation required.</p>
          </div>

          {/* Spec bar */}
          <div className="relative z-10 mt-auto border-t border-line bg-bg/70 backdrop-blur-sm">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 md:grid-cols-3">
              {SPECS.map((s) => (
                <div key={s.h}>
                  <p className="label mb-2">{s.h}</p>
                  <ul className="space-y-1">
                    {s.items.map((it) => (
                      <li key={it} className="font-mono text-xs text-muted">
                        — {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
