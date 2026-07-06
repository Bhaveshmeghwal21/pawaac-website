// Spec: pawaac-design-language-evolution — Task 29
// Requirements: 6.2
// Design: design.md -> Data Models -> FieldContextEntry; Correctness
//   Properties -> Property 8 "Deployments sector-label exactness"
//
// Pure validator function backing Property 8. Intentionally
// dependency-free and side-effect-free.

/**
 * The fixed set of valid Deployments_Page sector labels, per design.md's
 * FieldContextEntry data model.
 */
export const VALID_SECTOR_LABELS = [
  "defense",
  "police",
  "industrial",
  "infrastructure",
] as const;

/**
 * Returns true iff the given `labels` array has a length of exactly 1 and
 * its single element is drawn from `VALID_SECTOR_LABELS`, per design.md's
 * Property 8: "For all FieldContextEntry records on Deployments_Page, the
 * sectorLabels array has a length of exactly 1, and its single element is
 * drawn from the fixed set {defense, police, industrial, infrastructure}."
 */
export function isValidSectorLabelSet(labels: string[]): boolean {
  return (
    labels.length === 1 &&
    (VALID_SECTOR_LABELS as readonly string[]).includes(labels[0])
  );
}
