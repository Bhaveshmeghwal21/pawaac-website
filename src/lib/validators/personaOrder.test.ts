import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { isPersonaOrderValid, type PersonaTag } from "./personaOrder";

// Spec: pawaac-design-language-evolution — Task 28.1
// Requirements: 6.1, 6.3, 6.4
// Design: design.md -> Correctness Properties -> Property 7

const personaTagArb: fc.Arbitrary<PersonaTag> = fc.constantFrom(
  "Defense_Police_Persona",
  "Enterprise_Persona",
  "Both",
);

/** Naive, obviously-correct reference implementation: check every pair. */
function referenceIsPersonaOrderValid(
  sections: { order: number; personaTag: PersonaTag }[],
): boolean {
  for (const a of sections) {
    if (a.personaTag !== "Defense_Police_Persona") continue;
    for (const b of sections) {
      if (b.personaTag !== "Enterprise_Persona") continue;
      if (!(a.order < b.order)) return false;
    }
  }
  return true;
}

describe("isPersonaOrderValid", () => {
  it("returns true for an empty list", () => {
    expect(isPersonaOrderValid([])).toBe(true);
  });

  it("returns true when Defense_Police_Persona precedes Enterprise_Persona", () => {
    expect(
      isPersonaOrderValid([
        { order: 1, personaTag: "Defense_Police_Persona" },
        { order: 2, personaTag: "Enterprise_Persona" },
      ]),
    ).toBe(true);
  });

  it("returns false when Enterprise_Persona precedes Defense_Police_Persona", () => {
    expect(
      isPersonaOrderValid([
        { order: 1, personaTag: "Enterprise_Persona" },
        { order: 2, personaTag: "Defense_Police_Persona" },
      ]),
    ).toBe(false);
  });

  it("returns true when Both sections are interleaved without violating the constraint", () => {
    expect(
      isPersonaOrderValid([
        { order: 1, personaTag: "Defense_Police_Persona" },
        { order: 2, personaTag: "Both" },
        { order: 3, personaTag: "Enterprise_Persona" },
      ]),
    ).toBe(true);
  });

  // Feature: pawaac-design-language-evolution, Property 7: For any list of Section records belonging to one page, if the list contains at least one Defense_Police_Persona section and at least one Enterprise_Persona section, every Defense_Police_Persona section's order value is less than every Enterprise_Persona section's order value; for all Section records, exactly one of Defense_Police_Persona, Enterprise_Persona, or Both is set as personaTag.
  it("property: isPersonaOrderValid matches a naive pairwise reference implementation", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            order: fc.integer({ min: -50, max: 50 }),
            personaTag: personaTagArb,
          }),
          { maxLength: 30 },
        ),
        (sections) => {
          expect(isPersonaOrderValid(sections)).toBe(
            referenceIsPersonaOrderValid(sections),
          );
        },
      ),
    );
  });
});
