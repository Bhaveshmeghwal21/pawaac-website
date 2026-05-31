"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Cat = "Deployments" | "Hardware" | "Team";
const FILTERS = ["All", "Deployments", "Hardware", "Team"] as const;

const ITEMS: { cat: Cat; caption: string; meta: string; h: number; grad: string }[] = [
  { cat: "Deployments", caption: "Border Field Test", meta: "Tawang · May 2025", h: 280, grad: "from-[#1b2230] to-[#080808]" },
  { cat: "Hardware", caption: "e-VTOL Airframe", meta: "Bengaluru Lab", h: 200, grad: "from-[#26282d] to-[#0c0c0c]" },
  { cat: "Team", caption: "Field Operations", meta: "Bengaluru · 2025", h: 240, grad: "from-[#241a1b] to-[#0a0a0a]" },
  { cat: "Deployments", caption: "Night Patrol", meta: "Northern Unit", h: 320, grad: "from-[#101820] to-[#060606]" },
  { cat: "Hardware", caption: "Docking Station", meta: "ASC Bangalore", h: 220, grad: "from-[#1d1f24] to-[#0a0a0a]" },
  { cat: "Deployments", caption: "Aerial Survey", meta: "Kerala · KSIE", h: 260, grad: "from-[#15211c] to-[#070707]" },
  { cat: "Team", caption: "Command Post", meta: "Bengaluru HQ", h: 200, grad: "from-[#201c28] to-[#090909]" },
  { cat: "Hardware", caption: "30× Gimbal Camera", meta: "Hardware Bay", h: 300, grad: "from-[#22242a] to-[#0b0b0b]" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const shown = ITEMS.map((it, i) => ({ ...it, i })).filter(
    (it) => filter === "All" || it.cat === filter
  );

  const move = useCallback(
    (dir: number) =>
      setActive((a) => {
        if (a === null) return a;
        return (a + dir + ITEMS.length) % ITEMS.length;
      }),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, move]);

  return (
    <section className="bg-bg px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-bold text-fg md:text-6xl">Gallery</h2>
        <p className="mt-3 text-muted">From research to deployment, in the field.</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide transition ${
                filter === f
                  ? "border-red bg-red text-white"
                  : "border-line text-muted hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {shown.map((it) => (
              <motion.button
                key={it.caption}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActive(it.i)}
                style={{ height: it.h }}
                className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm border-2 border-transparent bg-gradient-to-br text-left transition hover:border-red ${it.grad}`}
              >
                <span className="absolute right-2 top-2 font-mono text-[9px] uppercase tracking-wide text-muted">
                  {it.cat}
                </span>
                <span className="absolute bottom-3 left-3 opacity-0 transition group-hover:opacity-100">
                  <span className="block font-mono text-xs text-fg">{it.caption}</span>
                  <span className="block font-mono text-[10px] text-muted">{it.meta}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute right-6 top-6 font-mono text-sm text-muted hover:text-fg"
              onClick={() => setActive(null)}
            >
              CLOSE ✕
            </button>
            <button
              className="absolute left-6 text-2xl text-muted hover:text-fg"
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
            >
              ‹
            </button>
            <div
              className={`relative aspect-video w-full max-w-4xl rounded-sm bg-gradient-to-br ${ITEMS[active].grad}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute bottom-4 left-4 font-mono text-xs text-fg">
                {ITEMS[active].caption}
                <span className="text-muted"> · {ITEMS[active].meta} · {ITEMS[active].cat}</span>
              </div>
            </div>
            <button
              className="absolute right-6 text-2xl text-muted hover:text-fg"
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
