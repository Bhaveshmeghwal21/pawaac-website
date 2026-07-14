// Spec: pawaac-design-language-evolution — Task 32
// Requirements: 8.4
// Design: design.md -> Correctness Properties -> Property 11
//   "Simulated-interface labeling correctness"
//
// Pure validator functions backing Property 11. Intentionally
// dependency-free and side-effect-free.

/**
 * Returns true iff a component flagged with the given `isSimulated` value
 * must render the visible + accessible "illustrative/simulated" label, per
 * design.md's Property 11: "for any component flagged isSimulated: true,
 * the rendered output contains a visible text label ... indicating the
 * interface is illustrative or simulated; for any component flagged
 * isSimulated: false, no such label is forced."
 *
 * This is intentionally the identity function — it exists to name and
 * document the rule so callers (and the property test) have a single,
 * explicit source of truth for "does this isSimulated value require the
 * label".
 */
export function requiresIllustrativeLabel(isSimulated: boolean): boolean {
  return isSimulated;
}

/**
 * Returns true iff `labelText` is non-empty and contains "illustrative" or
 * "simulated" (case-insensitive) as a substring. This validates the actual
 * label text used by components required to render the label (e.g.
 * AutonomyVisionAI.tsx's "Illustrative — simulated, not live footage").
 */
export function isValidIllustrativeLabel(labelText: string): boolean {
  if (labelText.length === 0) {
    return false;
  }
  const lower = labelText.toLowerCase();
  return lower.includes("illustrative") || lower.includes("simulated");
}
