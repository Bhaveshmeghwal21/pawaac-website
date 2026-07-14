import { describe, expect, it } from "vitest";
import { scanForBannedTerms } from "./bannedTerms";

// Spec: pawaac-design-language-evolution — Task 36
// Requirements: 5.4
// Design: design.md -> Testing Strategy -> Unit/example tests ->
//   "Placeholder_Media copy is scanned against a banned-term list
//    (coordinate patterns, unit/speed/range figures, 'AES-', etc.) and
//    contains none"
//
// Fixed, non-generative unit tests (per this design's Testing Strategy
// classification of this check as a unit/example test, not a property
// test).

describe("scanForBannedTerms", () => {
  it("returns an empty array for clean placeholder copy", () => {
    expect(
      scanForBannedTerms(
        "Geometric monochrome placeholder (angular drone silhouette line-art)",
      ),
    ).toEqual([]);
  });

  it("flags a coordinate-like pattern", () => {
    expect(scanForBannedTerms("Deployed near 12.9716° N")).toContain(
      "coordinate-like pattern",
    );
  });

  it("flags an AES encryption standard reference", () => {
    expect(scanForBannedTerms("Payload secured with AES-256")).toContain(
      "AES encryption standard reference",
    );
  });

  it("flags a speed/range/unit figure", () => {
    expect(scanForBannedTerms("Cruises at 120 km/h for 45 min")).toContain(
      "speed/range/unit figure",
    );
  });

  it("flags a GPS reference", () => {
    expect(scanForBannedTerms("Live GPS tracking overlay")).toContain(
      "GPS reference",
    );
  });

  it("returns multiple matches when several banned terms are present", () => {
    const result = scanForBannedTerms(
      "Unit deployed at 28.6139° N, cruising 40 km, AES-128 secured",
    );
    expect(result.length).toBeGreaterThanOrEqual(3);
  });
});
