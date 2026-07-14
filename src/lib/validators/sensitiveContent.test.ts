import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  resolveSensitiveContent,
  type ContentCategory,
} from "./sensitiveContent";

// Spec: pawaac-design-language-evolution — Task 31.1
// Requirements: 8.1, 8.2, 8.3
// Design: design.md -> Correctness Properties -> Property 10

const categories: ContentCategory[] = [
  "location_unit",
  "customer_partner",
  "certification",
];

describe("resolveSensitiveContent", () => {
  it("renders content unaltered when approval exists", () => {
    expect(
      resolveSensitiveContent("Unit 7 patrol route", "location_unit", true),
    ).toEqual({ rendered: "Unit 7 patrol route", wasAltered: false });
  });

  it("withholds content when no approval exists", () => {
    expect(
      resolveSensitiveContent("Unit 7 patrol route", "location_unit", false),
    ).toEqual({ rendered: null, wasAltered: true });
  });

  // Feature: pawaac-design-language-evolution, Property 10: For any content string or asset-registry entry categorized as location/unit reference, customer/partner reference, or certification/government/military claim, the content renders unaltered if and only if a corresponding approval record (recorded permission, documentation, or explicit approval) exists in the Redesign_Plan; otherwise the content is generalized, excluded, or withheld.
  it("property: rendered === content iff hasApproval; wasAltered === !hasApproval", () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.constantFrom(...categories),
        fc.boolean(),
        (content, category, hasApproval) => {
          const result = resolveSensitiveContent(
            content,
            category,
            hasApproval,
          );
          expect(result.rendered === content).toBe(hasApproval);
          expect(result.wasAltered).toBe(!hasApproval);
        },
      ),
    );
  });
});
