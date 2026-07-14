// Spec: pawaac-design-language-evolution — Task 34
// Requirements: 2.3
// Design: design.md -> Correctness Properties -> Property 13
//   "External-link marker correctness"
//
// Pure validator function backing Property 13. Intentionally
// dependency-free and side-effect-free.

/**
 * A footer link record, per design.md's Property 13 and the Footer's
 * External_Link_Marker behavior.
 */
export type FooterLink = {
  label: string;
  href: string;
  isExternal: boolean;
  markerRendered: boolean;
};

/**
 * Returns true iff `link.markerRendered === link.isExternal`, per
 * design.md's Property 13: "for any list of FooterLink records,
 * markerRendered equals isExternal for every entry — the marker renders on
 * every external link and on no internal link."
 */
export function isFooterLinkMarkerValid(link: FooterLink): boolean {
  return link.markerRendered === link.isExternal;
}
