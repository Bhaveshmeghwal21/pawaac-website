import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { PRIMARY_NAV_ROUTES, resolveActiveNavItem } from "./navActiveItem";

// Spec: pawaac-design-language-evolution — Task 35.1
// Requirements: 1.5, 1.6
// Design: design.md -> Correctness Properties -> Property 14

describe("resolveActiveNavItem", () => {
  it("returns the matching route for a primary nav route", () => {
    expect(resolveActiveNavItem("/autonomy")).toBe("/autonomy");
  });

  it("returns null for the Homepage route", () => {
    expect(resolveActiveNavItem("/")).toBe(null);
  });

  it("returns null for Contact_Page (not a primary nav item)", () => {
    expect(resolveActiveNavItem("/contact")).toBe(null);
  });

  it("returns null for an unrecognized route", () => {
    expect(resolveActiveNavItem("/not-a-real-route")).toBe(null);
  });

  // Feature: pawaac-design-language-evolution, Property 14: For any current route drawn from the set of all Pawaac_Site routes, the Navigation renders the active-item indicator under the one primary item whose route matches the current route, or under none of the 5 items if the current route matches none of them.
  it("property: resolveActiveNavItem returns the exact match or null, for a mix of valid routes and random strings", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constantFrom(...PRIMARY_NAV_ROUTES),
          fc.string(),
        ),
        (currentRoute) => {
          const expected =
            (PRIMARY_NAV_ROUTES as readonly string[]).find(
              (route) => route === currentRoute,
            ) ?? null;
          expect(resolveActiveNavItem(currentRoute)).toBe(expected);
        },
      ),
    );
  });
});
