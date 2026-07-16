"use client";

// StaggerHeading — word-by-word entrance reveal for section headings.
//
// Each word fades and lifts in with a short per-word stagger as the
// heading scrolls into view.
//
// Trigger mechanism (bugfix): originally driven purely by framer-motion's
// `whileInView` prop with `once: true`. That has the same known failure
// mode already fixed in Reveal.tsx (see that file's comments): some
// browsers/timing conditions never fire the IntersectionObserver's initial
// "intersecting" callback for an element, so `once: true` never triggers
// and the words stay permanently at their `hidden` (opacity: 0) state —
// observed here on this exact heading ("Building for demanding
// environments" rendering with "Building" invisible). Fixed the same way:
// driven off framer-motion's `useInView` hook plus a short safety-timeout
// fallback that force-reveals the words if the observer never fires,
// instead of `whileInView` alone.
//
// Reduced-motion: falls back to a plain, fully-visible heading under
// `prefers-reduced-motion: reduce`, matching every other animated
// component's fallback (see usePrefersReducedMotion.ts).
//
// Accessibility: the per-word <span> markup is aria-hidden and mirrors a
// single sr-only text node carrying the real heading text, so assistive
// technology always gets one clean, unsegmented string regardless of
// motion state or word-splitting.
import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: "0.35em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function StaggerHeading({
  text,
  as = "h2",
  className = "",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Tag = as;
  const words = text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [forceRevealed, setForceRevealed] = useState(false);

  // Safety net (same pattern as Reveal.tsx): force-reveal if the observer
  // never fires, so words can never stay stuck invisible.
  useEffect(() => {
    if (inView || prefersReducedMotion) return;
    const t = setTimeout(() => setForceRevealed(true), 1200);
    return () => clearTimeout(t);
  }, [inView, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const revealed = inView || forceRevealed;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        aria-hidden="true"
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        variants={container}
      >
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={wordVariant}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 && <>&nbsp;</>}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
