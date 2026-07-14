"use client";

import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [variant, setVariant] = useState<"default" | "hover" | "crosshair">(
    "default"
  );

  useEffect(() => {
    if (!fine) return;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = (e.target as HTMLElement)?.closest(
        "a,button,[data-cursor]"
      ) as HTMLElement | null;
      setVariant(
        t?.dataset.cursor === "crosshair"
          ? "crosshair"
          : t
            ? "hover"
            : "default"
      );
    };

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  const size = variant === "hover" ? 48 : variant === "crosshair" ? 36 : 34;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_2px_rgba(237,237,237,0.7)]"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border-2 transition-[width,height,background-color] duration-200"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          backgroundColor:
            variant === "hover" ? "rgba(184,184,184,0.2)" : "transparent",
          borderColor: variant === "crosshair" ? "#b8b8b8" : "rgba(237,237,237,0.85)",
        }}
      >
        {variant === "crosshair" && (
          <>
            <span className="absolute h-full w-px bg-white/70" />
            <span className="absolute h-px w-full bg-white/70" />
          </>
        )}
      </div>
    </>
  );
}
