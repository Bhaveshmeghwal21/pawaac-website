"use client";

// Spec: pawaac-design-language-evolution — Task 5 (Reveal_On_Scroll)
// Requirements: 9.8
// Design: design.md -> Shared Components -> Reveal_On_Scroll;
//         Reduced-Motion Fallback Matrix
//
// This is the pre-existing scroll-reveal component, extended in place rather
// than duplicated: its prop API (children, y, delay, className) is
// preserved so every existing call site (Contact.tsx, Traction.tsx, and the
// ~8 others) keeps working unchanged. The underlying technique is switched
// from a plain opacity/y-transform fade to a `clip-path: inset(...)` wipe
// reveal, triggered via framer-motion's `whileInView` (the viewport-trigger
// mechanism this component already used), per the Reveal_On_Scroll spec.
//
// The `y` prop is repurposed from "initial pixel offset" to "reveal
// direction": its sign selects whether the clip-path wipe opens bottom-up
// (y >= 0, matching the old "enters from below" intent) or top-down (y < 0).
// Its magnitude no longer drives a transform, since the design explicitly
// replaces y-transform with the clip-path technique.
//
// Reduced-motion fallback (Requirement 9.8): when
// `usePrefersReducedMotion()` is true, this renders children directly in
// their final, fully-revealed state with no clip-path keyframe and no
// transform.
import { motion } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Bottom-up wipe for y >= 0 (default / legacy "enters from below" call
  // sites); top-down wipe for y < 0.
  const closedClipPath =
    y < 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
  const openClipPath = "inset(0% 0% 0% 0%)";

  return (
    <motion.div
      className={className}
      initial={{ clipPath: closedClipPath }}
      whileInView={{ clipPath: openClipPath }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "clip-path" }}
    >
      {children}
    </motion.div>
  );
}
