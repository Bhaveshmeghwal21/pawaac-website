import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  isValidIllustrativeLabel,
  requiresIllustrativeLabel,
} from "./simulatedLabel";

// Spec: pawaac-design-language-evolution — Task 32.1
// Requirements: 8.4
// Design: design.md -> Correctness Properties -> Property 11

describe("requiresIllustrativeLabel", () => {
  it("returns true when isSimulated is true", () => {
    expect(requiresIllustrativeLabel(true)).toBe(true);
  });

  it("returns false when isSimulated is false", () => {
    expect(requiresIllustrativeLabel(false)).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 11: For any component flagged isSimulated: true, the rendered output contains a visible text label and an assistive-technology-perceivable accessible-name/attribute exposing equivalent text indicating the interface is illustrative or simulated; for any component flagged isSimulated: false, no such label is forced.
  it("property: requiresIllustrativeLabel(isSimulated) === isSimulated", () => {
    fc.assert(
      fc.property(fc.boolean(), (isSimulated) => {
        expect(requiresIllustrativeLabel(isSimulated)).toBe(isSimulated);
      }),
    );
  });
});

describe("isValidIllustrativeLabel", () => {
  it("returns true for the real Autonomy_Page label text", () => {
    expect(
      isValidIllustrativeLabel("Illustrative — simulated, not live footage"),
    ).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(isValidIllustrativeLabel("")).toBe(false);
  });

  it("returns false for text without either keyword", () => {
    expect(isValidIllustrativeLabel("Live detection overlay")).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 11: For any component flagged isSimulated: true, the rendered output contains a visible text label and an assistive-technology-perceivable accessible-name/attribute exposing equivalent text indicating the interface is illustrative or simulated; for any component flagged isSimulated: false, no such label is forced.
  it("property: isValidIllustrativeLabel matches the non-empty + substring rule", () => {
    fc.assert(
      fc.property(fc.string(), (labelText) => {
        const expected =
          labelText.length > 0 &&
          (labelText.toLowerCase().includes("illustrative") ||
            labelText.toLowerCase().includes("simulated"));
        expect(isValidIllustrativeLabel(labelText)).toBe(expected);
      }),
    );
  });
});
