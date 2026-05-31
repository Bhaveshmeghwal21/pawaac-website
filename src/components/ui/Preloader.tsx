"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOGO_PATH } from "@/components/ui/Logo";

const TRACE = { duration: 1.5, ease: [0.65, 0, 0.35, 1] as const };

export default function Preloader() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("pawaac-loaded")) return;
    setDone(false);
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("pawaac-loaded", "1");
    }, 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* diagonal recon scan, sweeps once off-axis */}
          <motion.span
            className="absolute h-[160vmax] w-px bg-white/40"
            style={{ rotate: "22deg" }}
            initial={{ x: "-55vw", opacity: 0 }}
            animate={{ x: "55vw", opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          <svg viewBox="0 0 640 640" className="h-24 w-24 -translate-y-1">
            <g transform="translate(0,640) scale(0.1,-0.1)">
              {/* trail drawn behind the comet */}
              <motion.path
                d={LOGO_PATH}
                fill="none"
                stroke="#f0ede8"
                strokeWidth={2}
                strokeOpacity={0.85}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={TRACE}
              />
              {/* bright comet head running the swirl */}
              <motion.path
                d={LOGO_PATH}
                fill="none"
                stroke="#ffffff"
                strokeWidth={5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0.025, pathOffset: 0, opacity: 1 }}
                animate={{ pathOffset: 0.975, opacity: [1, 1, 0] }}
                transition={TRACE}
              />
              {/* flood fill on arrival */}
              <motion.path
                d={LOGO_PATH}
                stroke="none"
                fill="#f0ede8"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ delay: 1.45, duration: 0.5, ease: "easeOut" }}
              />
            </g>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
