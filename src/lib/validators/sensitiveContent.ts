// Spec: pawaac-design-language-evolution — Task 31
// Requirements: 8.1, 8.2, 8.3
// Design: design.md -> Correctness Properties -> Property 10
//   "Sensitive-content compliance filter"
//
// Pure validator function backing Property 10. Intentionally
// dependency-free and side-effect-free.
//
// Note: real "generalization" (rewriting sensitive copy into approved,
// non-identifying phrasing) is a content-authoring decision, not something
// a pure function can produce. This validator models the withheld case as
// `rendered: null` rather than attempting to synthesize generalized text —
// callers that need generalized copy must supply their own approved
// replacement text upstream of this function.

/**
 * The three sensitive-content categories named in design.md's Property 10:
 * location/unit reference, customer/partner reference, and
 * certification/government/military claim.
 */
export type ContentCategory =
  | "location_unit"
  | "customer_partner"
  | "certification";

/**
 * Resolves whether a piece of categorized sensitive content renders
 * unaltered or is withheld, per design.md's Property 10: "the content
 * renders unaltered if and only if a corresponding approval record ...
 * exists ...; otherwise the content is generalized, excluded, or
 * withheld."
 *
 * - If `hasApproval` is true: returns the content unaltered, `wasAltered: false`.
 * - If `hasApproval` is false: returns `rendered: null` (modeling
 *   generalized/excluded/withheld) and `wasAltered: true`.
 *
 * `category` is accepted (and typed) to document which of the three
 * sensitive-content categories the caller is resolving, even though the
 * pure withhold/pass-through logic here is identical across categories.
 */
export function resolveSensitiveContent(
  content: string,
  category: ContentCategory,
  hasApproval: boolean,
): { rendered: string | null; wasAltered: boolean } {
  void category;
  if (hasApproval) {
    return { rendered: content, wasAltered: false };
  }
  return { rendered: null, wasAltered: true };
}
