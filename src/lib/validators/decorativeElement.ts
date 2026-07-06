// Spec: pawaac-design-language-evolution — Task 33
// Requirements: 9.8, 10.6
// Design: design.md -> Correctness Properties -> Property 12
//   "Decorative-element governance"
//
// Pure validator functions backing Property 12. Intentionally
// dependency-free and side-effect-free.

/**
 * The motion kinds a DecorativeElement (or any animated element) may carry,
 * per design.md's Reduced-Motion Fallback Matrix and Shared Components.
 */
export type MotionKind =
  | "parallax"
  | "scroll-jacking"
  | "clip-path-reveal"
  | "auto-loop";

/**
 * Returns true iff an element flagged `isDecorative` must carry
 * `aria-hidden="true"`, per design.md's Property 12: "for all
 * DecorativeElement records, if isDecorative = true, the rendered element
 * carries aria-hidden='true'."
 */
export function requiresAriaHidden(isDecorative: boolean): boolean {
  return isDecorative;
}

/**
 * Returns true iff motion should be suppressed for an element, per
 * design.md's Property 12: "for any DecorativeElement with a defined
 * motionKind, under prefers-reduced-motion: reduce its motion is disabled
 * while every element with isEssentialFeedback = true continues to render
 * its state-change output regardless of the reduced-motion setting."
 *
 * Motion is suppressed iff the element has a motion kind AND the user
 * prefers reduced motion AND the element is not essential feedback.
 * Essential-feedback elements are never suppressed, regardless of the
 * other two flags.
 */
export function shouldSuppressMotion(
  hasMotionKind: boolean,
  isEssentialFeedback: boolean,
  prefersReducedMotion: boolean,
): boolean {
  return hasMotionKind && prefersReducedMotion && !isEssentialFeedback;
}
