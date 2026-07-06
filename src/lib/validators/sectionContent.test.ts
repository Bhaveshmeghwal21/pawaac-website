import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  hasVisualElement,
  isSectionContentCompliant,
  MAX_HEADLINE_LENGTH,
  MAX_SUPPORTING_SENTENCE_LENGTH,
  type Section,
} from "./sectionContent";

// Spec: pawaac-design-language-evolution — Task 25.1
// Requirements: 4.1, 4.2
// Design: design.md -> Correctness Properties -> Property 4

describe("isSectionContentCompliant", () => {
  it("returns true for a short headline with no supporting sentence", () => {
    expect(isSectionContentCompliant({ headline: "Short headline" })).toBe(
      true,
    );
  });

  it("returns true for a headline+supportingSentence both within bounds", () => {
    expect(
      isSectionContentCompliant({
        headline: "a".repeat(60),
        supportingSentence: "b".repeat(140),
      }),
    ).toBe(true);
  });

  it("returns false for an over-length headline with no secondaryDisclosure", () => {
    expect(
      isSectionContentCompliant({ headline: "a".repeat(61) }),
    ).toBe(false);
  });

  it("returns true for an over-length headline with a non-empty secondaryDisclosure", () => {
    expect(
      isSectionContentCompliant({
        headline: "a".repeat(61),
        secondaryDisclosure: { kind: "table", ref: "spec-table-1" },
      }),
    ).toBe(true);
  });

  it("returns false for an over-length headline with an empty-ref secondaryDisclosure", () => {
    expect(
      isSectionContentCompliant({
        headline: "a".repeat(61),
        secondaryDisclosure: { kind: "table", ref: "" },
      }),
    ).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 4: For all Section records, the headline is at most 60 characters and at most one supporting sentence of at most 140 characters is present; for any Section whose intended content exceeds those bounds, the record has a non-empty secondaryDisclosure reference rather than additional inline body-copy fields.
  it("property: compliance matches the length + secondaryDisclosure rule for random Sections", () => {
    fc.assert(
      fc.property(
        fc.record({
          headlineLength: fc.integer({ min: 0, max: 120 }),
          hasSupportingSentence: fc.boolean(),
          supportingSentenceLength: fc.integer({ min: 0, max: 250 }),
          hasSecondaryDisclosure: fc.boolean(),
          secondaryDisclosureRefLength: fc.integer({ min: 0, max: 20 }),
        }),
        ({
          headlineLength,
          hasSupportingSentence,
          supportingSentenceLength,
          hasSecondaryDisclosure,
          secondaryDisclosureRefLength,
        }) => {
          const section: Section = {
            headline: "h".repeat(headlineLength),
            supportingSentence: hasSupportingSentence
              ? "s".repeat(supportingSentenceLength)
              : undefined,
            secondaryDisclosure: hasSecondaryDisclosure
              ? { kind: "table", ref: "r".repeat(secondaryDisclosureRefLength) }
              : undefined,
          };

          const exceedsBounds =
            headlineLength > MAX_HEADLINE_LENGTH ||
            (hasSupportingSentence &&
              supportingSentenceLength > MAX_SUPPORTING_SENTENCE_LENGTH);

          const hasNonEmptySecondaryDisclosure =
            hasSecondaryDisclosure && secondaryDisclosureRefLength > 0;

          const expected = exceedsBounds
            ? hasNonEmptySecondaryDisclosure
            : true;

          expect(isSectionContentCompliant(section)).toBe(expected);
        },
      ),
    );
  });
});


// Spec: pawaac-design-language-evolution — Task 26.1
// Requirements: 4.3
// Design: design.md -> Correctness Properties -> Property 5

describe("hasVisualElement", () => {
  it("returns false when visualElement is absent", () => {
    expect(hasVisualElement({ headline: "h" })).toBe(false);
  });

  it("returns false when visualElement is an empty string", () => {
    expect(hasVisualElement({ headline: "h", visualElement: "" })).toBe(
      false,
    );
  });

  it("returns true when visualElement is a non-empty string", () => {
    expect(
      hasVisualElement({ headline: "h", visualElement: "Reticle_Frame" }),
    ).toBe(true);
  });

  // Feature: pawaac-design-language-evolution, Property 5: For all Section records across Pawaac_Site, the visualElement field is present and non-empty.
  it("property: hasVisualElement reflects presence/absence/emptiness of visualElement for random Sections", () => {
    fc.assert(
      fc.property(
        fc.record({
          headline: fc.string(),
          hasVisualElement: fc.boolean(),
          visualElementLength: fc.integer({ min: 0, max: 30 }),
        }),
        ({ headline, hasVisualElement: present, visualElementLength }) => {
          const section: Section = {
            headline,
            visualElement: present
              ? "v".repeat(visualElementLength)
              : undefined,
          };

          const expected = present && visualElementLength > 0;

          expect(hasVisualElement(section)).toBe(expected);
        },
      ),
    );
  });
});
