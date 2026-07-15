import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { NAV_ROUTE_TO_PRIMARY_ITEM, resolveActiveNavItem } from "./navActiveItem";

// Spec: pawaac-design-language-evolution — Task 35.1 (updated by Task 61)
// Requirements: 1.5, 1.6
// Design: design.md -> Correctness Properties -> Property 14

describe("resolveActiveNavItem", () => {
  it("returns the matching primary-item id for a direct-route primary nav item", () => {
    expect(resolveActiveNavItem("/autonomy")).toBe("autonomy");
    expect(resolveActiveNavItem("/product")).toBe("product");
    expect(resolveActiveNavItem("/company")).toBe("company");
  });

  it("returns 'resources' for the Resources_Menu-linked Planner route", () => {
    expect(resolveActiveNavItem("/designer")).toBe("resources");
  });

  it("returns 'company' for each Company_Menu-linked route", () => {
    expect(resolveActiveNavItem("/company")).toBe("company");
    expect(resolveActiveNavItem("/careers")).toBe("company");
    expect(resolveActiveNavItem("/contact")).toBe("company");
    expect(resolveActiveNavItem("/news")).toBe("company");
    expect(resolveActiveNavItem("/commitments")).toBe("company");
  });

  it("returns null for the Homepage route", () => {
    expect(resolveActiveNavItem("/")).toBe(null);
  });

  it("returns null for /deployments (Deployments_Page has been removed entirely, task 65)", () => {
    expect(resolveActiveNavItem("/deployments")).toBe(null);
  });

  it("returns null for an unrecognized route", () => {
    expect(resolveActiveNavItem("/not-a-real-route")).toBe(null);
  });

  // Feature: pawaac-design-language-evolution, Property 14: For any current route drawn from the set of all Pawaac_Site routes, the Navigation renders the active-item indicator under exactly one of the 4 primary items — Product, Autonomy, Resources, or Company — if the current route is /product, /autonomy, the Resources_Menu-linked Planner route (/designer), or one of the Company_Menu-linked routes (/company, /careers, /contact, /news, /commitments, all of which resolve to the Company indicator), or under none of the 4 items if the current route matches none of those (i.e. Homepage only).
  it("property: resolveActiveNavItem returns the mapped primary-item id or null, for a mix of valid routes and random strings", () => {
    const mappedRoutes = Object.keys(NAV_ROUTE_TO_PRIMARY_ITEM);

    fc.assert(
      fc.property(
        fc.oneof(fc.constantFrom(...mappedRoutes), fc.string()),
        (currentRoute) => {
          const expected = NAV_ROUTE_TO_PRIMARY_ITEM[currentRoute] ?? null;
          expect(resolveActiveNavItem(currentRoute)).toBe(expected);
        },
      ),
    );
  });
});
