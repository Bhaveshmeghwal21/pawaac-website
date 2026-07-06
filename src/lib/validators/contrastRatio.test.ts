import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  CONTRAST_THRESHOLDS,
  contrastRatio,
  meetsContrastThreshold,
  relativeLuminance,
  type ContrastCategory,
} from "./contrastDirection";

// Spec: pawaac-design-language-evolution — Task 24.1
// Requirements: 3.6, 3.7, 3.8
// Design: design.md -> Correctness Properties -> Property 3

describe("contrastRatio", () => {
  it("returns 21 for pure black vs pure white", () => {
    expect(contrastRatio(0, 1)).toBeCloseTo(21, 5);
  });

  it("returns 1 for identical luminance", () => {
    expect(contrastRatio(0.5, 0.5)).toBeCloseTo(1, 5);
  });
});

describe("meetsContrastThreshold", () => {
  it("returns true for black-on-white body text (ratio 21:1 >= 4.5:1)", () => {
    expect(meetsContrastThreshold(0, 0, 0, 255, 255, 255, "body")).toBe(true);
  });

  it("returns false for a low-contrast grey-on-grey body pair", () => {
    expect(meetsContrastThreshold(120, 120, 120, 140, 140, 140, "body")).toBe(
      false,
    );
  });

  const categories: ContrastCategory[] = ["body", "heading", "interactive"];

  // Feature: pawaac-design-language-evolution, Property 3: For any defined body-text/background pair, heading-text/background pair (parameterized by whether the text size is >=24px), or interactive-shade/adjacent-background pair, the computed WCAG 2.1 contrast ratio meets the threshold required for that pair's category (4.5:1 body, 3:1 heading >=24px, 3:1 non-text interactive boundary).
  it("property: meetsContrastThreshold reflects an independently computed ratio against the category threshold", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.constantFrom(...categories),
        (fgChannel, bgChannel, category) => {
          const independentRatio = contrastRatio(
            relativeLuminance(fgChannel, fgChannel, fgChannel),
            relativeLuminance(bgChannel, bgChannel, bgChannel),
          );
          const expected = independentRatio >= CONTRAST_THRESHOLDS[category];
          expect(
            meetsContrastThreshold(
              fgChannel,
              fgChannel,
              fgChannel,
              bgChannel,
              bgChannel,
              bgChannel,
              category,
            ),
          ).toBe(expected);
        },
      ),
    );
  });
});
