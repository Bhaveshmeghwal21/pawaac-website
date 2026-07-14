import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  isValidPlaceholderMediaTransition,
  type PlaceholderMediaState,
} from "./placeholderMedia";

// Spec: pawaac-design-language-evolution — Task 27.1
// Requirements: 5.1, 5.3, 5.5
// Design: design.md -> Correctness Properties -> Property 6

const loadStates = ["pending", "success", "error"] as const;

const colorArb = fc.record({
  r: fc.integer({ min: 0, max: 255 }),
  g: fc.integer({ min: 0, max: 255 }),
  b: fc.integer({ min: 0, max: 255 }),
});

const stateArb: fc.Arbitrary<PlaceholderMediaState> = fc.record({
  loadState: fc.constantFrom(...loadStates),
  width: fc.integer({ min: 0, max: 4000 }),
  height: fc.integer({ min: 0, max: 4000 }),
  colorTokensUsed: fc.array(colorArb, { maxLength: 10 }),
});

describe("isValidPlaceholderMediaTransition", () => {
  it("returns true for a pending -> success transition with unchanged dimensions", () => {
    expect(
      isValidPlaceholderMediaTransition(
        { loadState: "pending", width: 640, height: 360, colorTokensUsed: [] },
        {
          loadState: "success",
          width: 640,
          height: 360,
          colorTokensUsed: [{ r: 245, g: 64, b: 58 }], // chromatic OK once success
        },
      ),
    ).toBe(true);
  });

  it("returns false when non-success colorTokensUsed contains a chromatic color", () => {
    expect(
      isValidPlaceholderMediaTransition(
        { loadState: "pending", width: 640, height: 360, colorTokensUsed: [] },
        {
          loadState: "pending",
          width: 640,
          height: 360,
          colorTokensUsed: [{ r: 245, g: 64, b: 58 }],
        },
      ),
    ).toBe(false);
  });

  it("returns false when dimensions change across a transition", () => {
    expect(
      isValidPlaceholderMediaTransition(
        { loadState: "pending", width: 640, height: 360, colorTokensUsed: [] },
        { loadState: "pending", width: 800, height: 360, colorTokensUsed: [] },
      ),
    ).toBe(false);
  });

  it("returns true for a success -> error reversion with unchanged dimensions and achromatic colors", () => {
    expect(
      isValidPlaceholderMediaTransition(
        {
          loadState: "success",
          width: 640,
          height: 360,
          colorTokensUsed: [{ r: 245, g: 64, b: 58 }],
        },
        {
          loadState: "error",
          width: 640,
          height: 360,
          colorTokensUsed: [{ r: 10, g: 10, b: 10 }],
        },
      ),
    ).toBe(true);
  });

  // Feature: pawaac-design-language-evolution, Property 6: For any PlaceholderMedia record and any sequence of loadState transitions among pending, success, and error: while loadState is not success, all rendered colors are drawn from the monochrome palette (Property 1's accepted-token set) and the container's width, height, and position remain equal to their value under loadState = success for every recorded realAssetPaths aspect ratio; if loadState transitions to error after having been success, the rendered output reverts to the placeholder treatment rather than a broken or empty element.
  it("property: transition validity matches the monochrome + fixed-dimensions rule for random state pairs", () => {
    fc.assert(
      fc.property(stateArb, stateArb, (prev, next) => {
        const monochromeWhileNotSuccess =
          next.loadState === "success" ||
          next.colorTokensUsed.every((c) => c.r === c.g && c.g === c.b);
        const dimensionsUnchanged =
          prev.width === next.width && prev.height === next.height;
        const expected = monochromeWhileNotSuccess && dimensionsUnchanged;

        expect(isValidPlaceholderMediaTransition(prev, next)).toBe(expected);
      }),
    );
  });
});
