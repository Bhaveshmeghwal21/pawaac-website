"use client";

// Spec: pawaac-design-language-evolution — Task 7 (Pinned_Spec_Sheet)
// Requirements: 4.4, 7.2, 8.3, 9.8
// Design: design.md -> Shared Components -> Pinned_Spec_Sheet;
//         Reduced-Motion Fallback Matrix
//
// Default behavior: the container becomes sticky-pinned for a scroll
// distance proportional to `panels.length`; internally, translateX maps
// 1:1 to scroll progress, advancing one panel per scroll-jacked segment.
// Each panel shows exactly one large standalone Display_Type numeral (never
// inline in a sentence, per Requirement 4.4), a Technical_Data unit/label
// above it, and at most one supporting sentence (<=140 chars) below.
//
// Numeral slot: this is a shell only. Real numerals are only populated once
// a linked Change_Proposal is recorded `approved` (Requirement 7.2); until
// then, callers should leave `numeral` empty/undefined and this component
// renders an explicit "Pending confirmation" Technical_Data placeholder
// rather than a fabricated figure (Requirement 8.3). This task does not
// hardcode or invent any real numeral values.
//
// Reduced-motion fallback (Requirement 9.8): renders as an un-pinned static
// vertical stack, in the same panel order, with no scroll-jacking and no
// translateX transform.
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export type SpecPanel = {
  label: string;
  numeral: string;
  supportingSentence: string;
};

const MAX_SUPPORTING_SENTENCE_LENGTH = 140;

function Numeral({ value }: { value: string }) {
  if (!value) {
    return (
      <p className="technical-data text-muted" aria-label="Pending confirmation">
        Pending confirmation
      </p>
    );
  }
  return <p className="text-display font-display leading-none text-fg">{value}</p>;
}

function Panel({ panel }: { panel: SpecPanel }) {
  const sentence = panel.supportingSentence.slice(0, MAX_SUPPORTING_SENTENCE_LENGTH);
  return (
    <div className="flex min-w-full flex-col items-start justify-center px-6">
      <p className="technical-data text-muted">{panel.label}</p>
      <div className="mt-3">
        <Numeral value={panel.numeral} />
      </div>
      {sentence && (
        <p className="mt-4 max-w-md text-body font-body text-fg">{sentence}</p>
      )}
    </div>
  );
}

function StaticStack({ panels }: { panels: SpecPanel[] }) {
  // Reduced-motion fallback: static vertical stack, no pin, no translateX.
  return (
    <div className="flex flex-col gap-16">
      {panels.map((panel, i) => (
        <Panel key={`${panel.label}-${i}`} panel={panel} />
      ))}
    </div>
  );
}

function ScrollJackedTrack({ panels }: { panels: SpecPanel[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed scroll progress: a raw 1:1 scrollYProgress ->
  // translateX mapping feels mechanically scroll-locked (panels snap
  // exactly to scroll position with zero lag/momentum). Feeding
  // scrollYProgress through a light spring before the translateX transform
  // gives the horizontal track a small amount of trailing momentum instead,
  // so panels settle into place rather than rigidly tracking the scrollbar
  // 1:1. Stiff/damped enough to still feel responsive and to fully resolve
  // to the same start/end extremes as the raw progress value.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.4,
  });

  const translateX = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${(panels.length - 1) * 100}%`]
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${panels.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x: translateX, willChange: "transform" }}
          className="flex h-full items-center"
        >
          {panels.map((panel, i) => (
            <Panel key={`${panel.label}-${i}`} panel={panel} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function PinnedSpecSheet({
  panels,
  className = "",
}: {
  panels: SpecPanel[];
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (panels.length === 0) return null;

  return (
    <div className={className}>
      {prefersReducedMotion ? (
        <StaticStack panels={panels} />
      ) : (
        <ScrollJackedTrack panels={panels} />
      )}
    </div>
  );
}
