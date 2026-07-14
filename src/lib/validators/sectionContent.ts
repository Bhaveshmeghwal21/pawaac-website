// Spec: pawaac-design-language-evolution — Tasks 25, 26
// Requirements: 4.1, 4.2, 4.3
// Design: design.md -> Data Models -> Section; Correctness Properties ->
//   Property 4 "Section content-length and secondary-disclosure compliance",
//   Property 5 "Section visual-element completeness"
//
// Pure validator functions backing Properties 4 and 5. Intentionally
// dependency-free and side-effect-free.

/** The maximum allowed headline length, per Requirement 4.1. */
export const MAX_HEADLINE_LENGTH = 60;

/** The maximum allowed supporting-sentence length, per Requirement 4.1. */
export const MAX_SUPPORTING_SENTENCE_LENGTH = 140;

/**
 * A Section record, as defined in design.md's Data Models section. Only the
 * fields relevant to Property 4 (content-length and secondary-disclosure
 * compliance) are required here; other Section fields (page, order,
 * personaTag, visualElement, placeholderMedia) are omitted since they are
 * not consumed by this validator.
 */
export type Section = {
  headline: string; // <= 60 chars
  supportingSentence?: string; // <= 140 chars, at most one
  secondaryDisclosure?: { kind: "table" | "panel" | "subpage"; ref: string };
  visualElement?: string; // required, non-empty (Property 5)
};

/**
 * Returns true iff the given Section record complies with design.md's
 * Property 4:
 *
 * - `headline.length` is at most 60 characters, AND
 * - `supportingSentence` is either absent or at most 140 characters, AND
 * - if the headline exceeds 60 characters OR the supporting sentence
 *   exceeds 140 characters, `secondaryDisclosure` must be defined with a
 *   non-empty `ref`.
 */
export function isSectionContentCompliant(section: Section): boolean {
  const headlineWithinBounds =
    section.headline.length <= MAX_HEADLINE_LENGTH;
  const supportingSentenceLength = section.supportingSentence?.length ?? 0;
  const supportingSentenceWithinBounds =
    section.supportingSentence === undefined ||
    supportingSentenceLength <= MAX_SUPPORTING_SENTENCE_LENGTH;

  const exceedsBounds =
    section.headline.length > MAX_HEADLINE_LENGTH ||
    supportingSentenceLength > MAX_SUPPORTING_SENTENCE_LENGTH;

  const hasNonEmptySecondaryDisclosure =
    section.secondaryDisclosure !== undefined &&
    section.secondaryDisclosure.ref.length > 0;

  if (exceedsBounds) {
    return hasNonEmptySecondaryDisclosure;
  }

  return headlineWithinBounds && supportingSentenceWithinBounds;
}


/**
 * Returns true iff the given Section record's `visualElement` field is
 * present (not `undefined`) and non-empty (length > 0), per design.md's
 * Property 5: "For all Section records across Pawaac_Site, the
 * `visualElement` field is present and non-empty."
 */
export function hasVisualElement(section: Section): boolean {
  return (
    section.visualElement !== undefined && section.visualElement.length > 0
  );
}
