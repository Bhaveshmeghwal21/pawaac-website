// Spec: pawaac-design-language-evolution — Task 35 (superseded by Task 61)
// Requirements: 1.5, 1.6
// Design: design.md -> Correctness Properties -> Property 14
//   "Navigation active-indicator correctness"
//
// Pure validator function backing Property 14. Intentionally
// dependency-free and side-effect-free.
//
// Task 61 update: Navigation was restructured (task 57) from 5 flat
// primary items to 4 primary items — Product, Autonomy, Resources,
// Company — where Resources is a dropdown with no own route. Three
// internal routes (`/designer`, `/news`, `/commitments`) now all resolve
// to the single "resources" indicator instead of being flat, individually
// distinct entries. The cleanest data shape for this is a map from route ->
// primary-item id, rather than a flat array of routes.
//
// Follow-up update (Company dropdown): Company was restructured from a
// flat link into a dropdown (Company_Menu) exposing About Us (/company),
// Careers (/careers), and Contact Us (/contact) — mirroring how Resources
// already collapses multiple routes onto one indicator. `/careers` and
// `/contact` now map to `"company"` instead of resolving to `null`.

/** The primary-item id a route resolves to, for driving the active-item indicator. */
export type PrimaryNavItemId = "product" | "autonomy" | "resources" | "company";

/**
 * Map of every route that drives a primary-item active-indicator to the
 * primary-item id it resolves to. Product and Autonomy each map to
 * themselves 1:1; `/designer`, `/news`, and `/commitments` all map to
 * `"resources"`, since Resources has no own route and instead activates
 * whenever the current route is one of its three internal dropdown links
 * (Analyser is external and is intentionally excluded — it cannot itself
 * be "the current page"). `/company`, `/careers`, and `/contact` all map
 * to `"company"`, since Company_Menu now links to all three.
 */
export const NAV_ROUTE_TO_PRIMARY_ITEM: Record<string, PrimaryNavItemId> = {
  "/product": "product",
  "/autonomy": "autonomy",
  "/company": "company",
  "/careers": "company",
  "/contact": "company",
  "/designer": "resources",
  "/news": "resources",
  "/commitments": "resources",
};

/**
 * Resolves the active primary-item indicator for the given current route,
 * per design.md's Property 14 (updated for the 4-item + Resources_Menu +
 * Company_Menu structure): "for any current route drawn from the set of
 * all Pawaac_Site routes, the Navigation renders the active-item indicator
 * under exactly one of the 4 primary items — Product, Autonomy, Resources,
 * or Company — if the current route is `/product`, `/autonomy`, one of the
 * three Resources_Menu-linked internal routes (`/designer`, `/news`,
 * `/commitments`, all of which resolve to the Resources indicator), or one
 * of the three Company_Menu-linked routes (`/company`, `/careers`,
 * `/contact`, all of which resolve to the Company indicator), or under
 * none of the 4 items if the current route matches none of those (i.e.
 * Homepage only). Deployments_Page (`/deployments`) has been removed
 * entirely (task 65) and, like any other unmapped route, resolves to
 * `null`."
 *
 * Returns the resolved `PrimaryNavItemId`, or `null` if `currentRoute`
 * matches none of the mapped routes.
 */
export function resolveActiveNavItem(
  currentRoute: string,
): PrimaryNavItemId | null {
  return NAV_ROUTE_TO_PRIMARY_ITEM[currentRoute] ?? null;
}
