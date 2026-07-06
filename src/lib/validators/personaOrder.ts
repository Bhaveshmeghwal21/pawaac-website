// Spec: pawaac-design-language-evolution — Task 28
// Requirements: 6.1, 6.3, 6.4
// Design: design.md -> Architecture -> Persona Ordering Policy;
//   Correctness Properties -> Property 7 "Persona ordering invariant"
//
// Pure validator function backing Property 7. Intentionally
// dependency-free and side-effect-free.

/**
 * The persona tag assigned to a Section record, per design.md's Data
 * Models. Exactly one of these three values is set per Section.
 */
export type PersonaTag =
  | "Defense_Police_Persona"
  | "Enterprise_Persona"
  | "Both";

/**
 * Returns true iff every `Defense_Police_Persona`-tagged section's `order`
 * value is less than every `Enterprise_Persona`-tagged section's `order`
 * value, per design.md's Property 7 / the Architecture's Persona Ordering
 * Policy. `Both`-tagged sections are unconstrained — they may appear at
 * any order value.
 *
 * Vacuously true when the list contains no `Defense_Police_Persona`
 * sections, no `Enterprise_Persona` sections, or neither.
 */
export function isPersonaOrderValid(
  sections: { order: number; personaTag: PersonaTag }[],
): boolean {
  const defensePoliceOrders = sections
    .filter((s) => s.personaTag === "Defense_Police_Persona")
    .map((s) => s.order);
  const enterpriseOrders = sections
    .filter((s) => s.personaTag === "Enterprise_Persona")
    .map((s) => s.order);

  if (defensePoliceOrders.length === 0 || enterpriseOrders.length === 0) {
    return true;
  }

  const maxDefensePolice = Math.max(...defensePoliceOrders);
  const minEnterprise = Math.min(...enterpriseOrders);

  return maxDefensePolice < minEnterprise;
}
