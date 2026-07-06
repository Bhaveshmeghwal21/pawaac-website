import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { isValidSectorLabelSet, VALID_SECTOR_LABELS } from "./sectorLabel";

// Spec: pawaac-design-language-evolution — Task 29.1
// Requirements: 6.2
// Design: design.md -> Correctness Properties -> Property 8

describe("isValidSectorLabelSet", () => {
  it("returns true for a single valid label", () => {
    expect(isValidSectorLabelSet(["defense"])).toBe(true);
  });

  it("returns false for an empty array", () => {
    expect(isValidSectorLabelSet([])).toBe(false);
  });

  it("returns false for more than one label", () => {
    expect(isValidSectorLabelSet(["defense", "police"])).toBe(false);
  });

  it("returns false for a single invalid label", () => {
    expect(isValidSectorLabelSet(["enterprise"])).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 8: For all FieldContextEntry records on Deployments_Page, the sectorLabels array has a length of exactly 1, and its single element is drawn from the fixed set {defense, police, industrial, infrastructure}.
  it("property: isValidSectorLabelSet matches the exactly-one-valid-label rule for random string arrays", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.oneof(
            fc.constantFrom(...VALID_SECTOR_LABELS),
            fc.string({ maxLength: 15 }),
          ),
          { maxLength: 5 },
        ),
        (labels) => {
          const expected =
            labels.length === 1 &&
            (VALID_SECTOR_LABELS as readonly string[]).includes(labels[0]);
          expect(isValidSectorLabelSet(labels)).toBe(expected);
        },
      ),
    );
  });
});
