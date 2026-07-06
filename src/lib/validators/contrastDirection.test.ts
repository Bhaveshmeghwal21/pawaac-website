import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { relativeLuminance, resolveForegroundDirection } from "./contrastDirection";

// Spec: pawaac-design-language-evolution — Task 23.1
// Requirements: 3.4, 3.5
// Design: design.md -> Correctness Properties -> Property 2

describe("relativeLuminance", () => {
  it("returns 0 for pure black", () => {
    expect(relativeLuminance(0, 0, 0)).toBe(0);
  });

  it("returns 1 for pure white", () => {
    expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 5);
  });
});

describe("resolveForegroundDirection", () => {
  it("resolves to white for a black background", () => {
    expect(resolveForegroundDirection(0, 0, 0)).toBe("white");
  });

  it("resolves to black for a white background", () => {
    expect(resolveForegroundDirection(255, 255, 255)).toBe("black");
  });

  // Feature: pawaac-design-language-evolution, Property 2: For any defined background/foreground token pair, if the background token's relative luminance is below the dark/light midpoint, the paired foreground (including the Logo) resolves to white or near-white; if at or above the midpoint, the paired foreground resolves to black or near-black.
  it("property: for any achromatic background, direction matches the luminance midpoint rule", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 255 }), (channel) => {
        const luminance = relativeLuminance(channel, channel, channel);
        const expected = luminance < 0.5 ? "white" : "black";
        expect(resolveForegroundDirection(channel, channel, channel)).toBe(
          expected,
        );
      }),
    );
  });
});
