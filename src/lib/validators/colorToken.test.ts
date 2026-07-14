import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  hasAtMostOneReservedInteractiveToken,
  isAchromaticColorToken,
} from "./colorToken";

// Spec: pawaac-design-language-evolution — Task 22.1
// Requirements: 3.1, 3.3
// Design: design.md -> Correctness Properties -> Property 1

describe("isAchromaticColorToken", () => {
  it("returns true for a known achromatic value (black)", () => {
    expect(isAchromaticColorToken(0, 0, 0)).toBe(true);
  });

  it("returns false for a known non-achromatic value", () => {
    expect(isAchromaticColorToken(245, 64, 58)).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 1: For any proposed or existing color token or inline color value, the value is accepted by the Visual_System's token validator if and only if its red, green, and blue channels are equal (zero saturation); for any set of accepted tokens, at most one token is marked reservedForInteractiveOnly: true.
  it("property: isAchromaticColorToken(r,g,b) is true iff r===g===b", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        (r, g, b) => {
          const expected = r === g && g === b;
          expect(isAchromaticColorToken(r, g, b)).toBe(expected);
        },
      ),
    );
  });
});

describe("hasAtMostOneReservedInteractiveToken", () => {
  it("returns true for an empty list", () => {
    expect(hasAtMostOneReservedInteractiveToken([])).toBe(true);
  });

  it("returns false when two tokens are reserved", () => {
    expect(
      hasAtMostOneReservedInteractiveToken([
        { reservedForInteractiveOnly: true },
        { reservedForInteractiveOnly: true },
      ]),
    ).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 1: For any proposed or existing color token or inline color value, the value is accepted by the Visual_System's token validator if and only if its red, green, and blue channels are equal (zero saturation); for any set of accepted tokens, at most one token is marked reservedForInteractiveOnly: true.
  it("property: correctly reports whether the reserved-token count is <= 1", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({ reservedForInteractiveOnly: fc.boolean() }),
          { maxLength: 50 },
        ),
        (tokens) => {
          const expected =
            tokens.filter((t) => t.reservedForInteractiveOnly).length <= 1;
          expect(hasAtMostOneReservedInteractiveToken(tokens)).toBe(expected);
        },
      ),
    );
  });
});
