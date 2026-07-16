"use client";

// Spec: pawaac-design-language-evolution — Task 5 (Reveal_On_Scroll)
// Requirements: 9.8
// Design: design.md -> Shared Components -> Reveal_On_Scroll;
//         Reduced-Motion Fallback Matrix
//
// This is the pre-existing scroll-reveal component, extended in place rather
// than duplicated: its prop API (children, y, delay, className) is
// preserved so every existing call site (Contact.tsx, Traction.tsx, and the
// ~8 others) keeps working unchanged. The underlying technique combines a
// `clip-path: inset(...)` wipe with a small paired translateY + scale, both
// triggered once the element is judged to be in view, per the
// Reveal_On_Scroll spec.
// The clip-path wipe alone reads as a flat mask; pairing it with a short
// (<=14px) settle-in translate and a subtle scale gives revealed content a
// sense of physical weight/momentum instead of just unmasking in place.
//
// Trigger mechanism (bugfix): originally driven purely by framer-motion's
// `whileInView` prop. That has a known failure mode for content that is
// already in the viewport at first paint (e.g. the Homepage hero) when an
// ancestor has `overflow-hidden` and the element's own initial state is
// clip-path-clipped to zero visible area — some browsers'
// IntersectionObserver never reports an initial "intersecting" callback in
// that combination, so `once: true` never fires and the content stays
// permanently invisible (see HOMEPAGE_MISSING_PARTS.md's first item).
// Fixed by driving the reveal off framer-motion's `useInView` hook instead
// (same IntersectionObserver under the hood), plus a short safety-timeout
// fallback that force-reveals the content if the observer hasn't fired
// within 1.2s of mount regardless of cause — belt-and-suspenders against
// this exact class of bug recurring, and also the mechanism that covers
// environments where IntersectionObserver itself never fires at all.
//
// The `y` prop is repurposed from "initial pixel offset" to "reveal
// direction": its sign selects whether the clip-path wipe opens bottom-up
// (y >= 0, matching the old "enters from below" intent) or top-down (y < 0).
// Its magnitude no longer drives the clip-path itself, but is still used
// (clamped small) to size the paired settle-in translate distance below.
//
// Reduced-motion fallback (Requirement 9.8): when
// `usePrefersReducedMotion()` is true, this renders children directly in
// their final, fully-revealed state with no clip-path keyframe and no
// transform.
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [forceRevealed, setForceRevealed] = useState(false);

  // Safety net: if the IntersectionObserver-driven `inView` state never
  // flips true (the exact failure mode this component previously hit for
  // above-the-fold content), force the revealed state after a short delay
  // regardless of cause, so content can never be stuck invisible.
  useEffect(() => {
    if (inView || prefersReducedMotion) return;
    const t = setTimeout(() => setForceRevealed(true), 1200);
    return () => clearTimeout(t);
  }, [inView, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const revealed = inView || forceRevealed;

  // Bottom-up wipe for y >= 0 (default / legacy "enters from below" call
  // sites); top-down wipe for y < 0.
  const direction = y < 0 ? -1 : 1;
  const closedClipPath =
    y < 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
  const openClipPath = "inset(0% 0% 0% 0%)";

  // Small, clamped settle-in distance (<=14px) paired with the wipe, so
  // content has physical weight/momentum rather than just unmasking flat
  // in place. Independent of the (much larger) legacy `y` magnitudes some
  // call sites still pass, which now only matter for their sign.
  const settleDistance = Math.min(Math.abs(y), 14) * direction;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: closedClipPath, y: settleDistance, scale: 0.985 }}
      animate={
        revealed
          ? { clipPath: openClipPath, y: 0, scale: 1 }
          : { clipPath: closedClipPath, y: settleDistance, scale: 0.985 }
      }
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "clip-path, transform" }}
    >
      {children}
    </motion.div>
  );
}
