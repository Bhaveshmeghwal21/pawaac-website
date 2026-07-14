// Spec: pawaac-design-language-evolution — Task 27
// Requirements: 5.1, 5.3, 5.5
// Design: design.md -> Data Models -> PlaceholderMedia; Correctness
//   Properties -> Property 6 "Placeholder_Media lifecycle correctness"
//
// Pure validator function backing Property 6. Intentionally
// dependency-free and side-effect-free.

import { isAchromaticColorToken } from "./colorToken";

/**
 * A minimal state snapshot of a `Placeholder_Media` instance across a
 * `loadState` transition, sufficient to validate design.md's Property 6.
 * Only the fields consumed by the transition rule are modeled here; other
 * PlaceholderMedia fields (id, treatmentType, realAssetPaths) are omitted
 * since they are not consumed by this validator.
 */
export type PlaceholderMediaState = {
  loadState: "pending" | "success" | "error";
  width: number;
  height: number;
  colorTokensUsed: { r: number; g: number; b: number }[];
};

/**
 * Returns true iff the transition from `prev` to `next` complies with
 * design.md's Property 6:
 *
 * - (a) while `next.loadState` is not `"success"`, every color in
 *   `next.colorTokensUsed` is achromatic (drawn from the monochrome
 *   palette — Property 1's accepted-token set);
 * - (b) `width`/`height` stay equal across the transition (the container's
 *   dimensions never change), and
 * - (c) if `prev.loadState === "success"` and `next.loadState === "error"`,
 *   that reversion to the placeholder treatment is a valid transition
 *   (rather than a broken/empty element).
 */
export function isValidPlaceholderMediaTransition(
  prev: PlaceholderMediaState,
  next: PlaceholderMediaState,
): boolean {
  const monochromeWhileNotSuccess =
    next.loadState === "success" ||
    next.colorTokensUsed.every((c) =>
      isAchromaticColorToken(c.r, c.g, c.b),
    );

  const dimensionsUnchanged =
    prev.width === next.width && prev.height === next.height;

  // (c) is a permissive clause: a success -> error reversion is explicitly
  // allowed (not forbidden) as long as (a) and (b) also hold — it does not
  // add any additional constraint beyond those two.
  return monochromeWhileNotSuccess && dimensionsUnchanged;
}
