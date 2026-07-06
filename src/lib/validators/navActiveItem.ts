// Spec: pawaac-design-language-evolution — Task 35
// Requirements: 1.5, 1.6
// Design: design.md -> Correctness Properties -> Property 14
//   "Navigation active-indicator correctness"
//
// Pure validator function backing Property 14. Intentionally
// dependency-free and side-effect-free.

/**
 * The 5 primary Navigation routes, in the order specified by design.md's
 * Shared Components -> Header / Navigation section (task 17): Product,
 * Autonomy, Deployments, Planner, Company.
 */
export const PRIMARY_NAV_ROUTES = [
  "/product",
  "/autonomy",
  "/deployments",
  "/designer",
  "/company",
] as const;

/**
 * Resolves the active-item indicator for the given current route, per
 * design.md's Property 14: "for any current route drawn from the set of
 * all Pawaac_Site routes, the Navigation renders the active-item indicator
 * under the one primary item whose route matches the current route, or
 * under none of the 5 items if the current route matches none of them."
 *
 * Returns the matching route string from `PRIMARY_NAV_ROUTES` on an exact
 * match, or `null` if `currentRoute` matches none of them (e.g. Homepage
 * `/`, Contact_Page `/contact`, Careers_Page `/careers`, or any
 * unrecognized string).
 */
export function resolveActiveNavItem(currentRoute: string): string | null {
  const match = (PRIMARY_NAV_ROUTES as readonly string[]).find(
    (route) => route === currentRoute,
  );
  return match ?? null;
}
