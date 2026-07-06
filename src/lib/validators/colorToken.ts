// Spec: pawaac-design-language-evolution — Task 22
// Requirements: 3.1, 3.3
// Design: design.md -> Correctness Properties -> Property 1
//   "Achromatic token compliance"
//
// Pure validator functions backing Property 1. These are intentionally
// dependency-free and side-effect-free so they can be exercised directly by
// fast-check property tests as well as reused by any future CI/content-lint
// tooling that needs to validate proposed color tokens.

/**
 * Returns true iff the given r/g/b channel values (each expected to be an
 * integer in [0, 255], per the 8-bit color channel range) are achromatic —
 * that is, all three channels are equal (zero saturation).
 *
 * Per design.md's Property 1: "the value is accepted by the Visual_System's
 * token validator if and only if its red, green, and blue channels are
 * equal (zero saturation)."
 */
export function isAchromaticColorToken(
  r: number,
  g: number,
  b: number,
): boolean {
  return r === g && g === b;
}

/**
 * Returns true iff at most one token in the given list is marked
 * `reservedForInteractiveOnly: true`.
 *
 * Per design.md's Property 1: "for any set of accepted tokens, at most one
 * token is marked `reservedForInteractiveOnly: true`."
 */
export function hasAtMostOneReservedInteractiveToken(
  tokens: { reservedForInteractiveOnly: boolean }[],
): boolean {
  return tokens.filter((t) => t.reservedForInteractiveOnly).length <= 1;
}
