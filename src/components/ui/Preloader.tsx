"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOGO_PATH } from "@/components/ui/Logo";

export default function Preloader() {
  const [done, setDone] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pawaac-loaded")) return;
    setDone(false);
    const r = setTimeout(() => setReady(true), 1400);
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("pawaac-loaded", "1");
    }, 2200);
    return () => {
      clearTimeout(r);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black"
        >
          <motion.svg
            viewBox="0 0 640 640"
            className="h-28 w-28"
            initial={{ scale: 0.9, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <g transform="translate(0,640) scale(0.1,-0.1)">
              <motion.path
                d={LOGO_PATH}
                stroke="#f0ede8"
                strokeWidth={2}
                fill="#f0ede8"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 1.3, ease: "easeInOut" },
                  fillOpacity: { delay: 1, duration: 0.6 },
                }}
              />
            </g>
          </motion.svg>

          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.32em" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-5 font-display text-xl font-bold text-fg"
          >
            PAWAAC
          </motion.span>

          <div className="mt-4 h-px w-40 overflow-hidden bg-line">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="h-full bg-red"
            />
          </div>
          <span className="label mt-3 text-[10px]">
            {ready ? "SYSTEM READY" : "INITIALIZING"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
