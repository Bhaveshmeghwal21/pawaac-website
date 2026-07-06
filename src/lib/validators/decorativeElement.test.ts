import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { requiresAriaHidden, shouldSuppressMotion } from "./decorativeElement";

// Spec: pawaac-design-language-evolution — Task 33.1
// Requirements: 9.8, 10.6
// Design: design.md -> Correctness Properties -> Property 12

describe("requiresAriaHidden", () => {
  it("returns true for a decorative element", () => {
    expect(requiresAriaHidden(true)).toBe(true);
  });

  it("returns false for a non-decorative element", () => {
    expect(requiresAriaHidden(false)).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 12: For all DecorativeElement records, if isDecorative = true, the rendered element carries aria-hidden="true"; for any DecorativeElement with a defined motionKind, under prefers-reduced-motion: reduce its motion is disabled while every element with isEssentialFeedback = true continues to render its state-change output regardless of the reduced-motion setting.
  it("property: requiresAriaHidden(isDecorative) === isDecorative", () => {
    fc.assert(
      fc.property(fc.boolean(), (isDecorative) => {
        expect(requiresAriaHidden(isDecorative)).toBe(isDecorative);
      }),
    );
  });
});

describe("shouldSuppressMotion", () => {
  it("never suppresses essential feedback, even with a motion kind and reduced motion", () => {
    expect(shouldSuppressMotion(true, true, true)).toBe(false);
  });

  it("suppresses non-essential motion when reduced motion is on", () => {
    expect(shouldSuppressMotion(true, false, true)).toBe(true);
  });

  it("does not suppress when the user has no reduced-motion preference", () => {
    expect(shouldSuppressMotion(true, false, false)).toBe(false);
  });

  it("does not suppress an element with no motion kind", () => {
    expect(shouldSuppressMotion(false, false, true)).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 12: For all DecorativeElement records, if isDecorative = true, the rendered element carries aria-hidden="true"; for any DecorativeElement with a defined motionKind, under prefers-reduced-motion: reduce its motion is disabled while every element with isEssentialFeedback = true continues to render its state-change output regardless of the reduced-motion setting.
  it("property: shouldSuppressMotion matches hasMotionKind && prefersReducedMotion && !isEssentialFeedback, and essential feedback is never suppressed", () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (hasMotionKind, isEssentialFeedback, prefersReducedMotion) => {
          const expected =
            hasMotionKind && prefersReducedMotion && !isEssentialFeedback;
          const actual = shouldSuppressMotion(
            hasMotionKind,
            isEssentialFeedback,
            prefersReducedMotion,
          );
          expect(actual).toBe(expected);
          if (isEssentialFeedback) {
            expect(actual).toBe(false);
          }
        },
      ),
    );
  });
});
