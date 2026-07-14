"use client";

// Spec: pawaac-design-language-evolution — Task 8
// Requirements: 9.8
// Design: design.md -> Reduced-Motion Fallback Matrix
//
// Shared reactive hook reading the `prefers-reduced-motion: reduce` media
// query. Consumed by Reveal_On_Scroll (Task 5) and Pinned_Spec_Sheet
// (Task 7) to select their reduced-motion fallback branch, per the
// Reduced-Motion Fallback Matrix in design.md.
//
// Fail-safe default: while the media query cannot yet be read (e.g. during
// SSR, before the effect runs), this hook returns `false` on the client on
// first paint and then re-evaluates in an effect. Consumers that must be
// fail-safe toward LESS motion on unsupported browsers should treat a
// `matchMedia` throw/absence the same as `reduce` — see the `catch` branch
// below, which returns `true` if `window.matchMedia` is unavailable.
//
// Focus indicators and Uplink_Form submission status (Task 6) intentionally
// do NOT consume this hook — they are always rendered regardless of the
// reduced-motion setting, per the Reduced-Motion Fallback Matrix.
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function readPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  try {
    return window.matchMedia(QUERY).matches;
  } catch {
    // Fail-safe toward less motion if the media query cannot be evaluated.
    return true;
  }
}

export default function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () => readPrefersReducedMotion()
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(QUERY);
    // Initial state is already set correctly via the lazy useState
    // initializer above; this effect only needs to subscribe to changes.
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
