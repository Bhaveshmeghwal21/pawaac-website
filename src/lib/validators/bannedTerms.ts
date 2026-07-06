// Spec: pawaac-design-language-evolution — Task 36
// Requirements: 5.4
// Design: design.md -> Testing Strategy -> Unit/example tests ->
//   "Placeholder_Media copy is scanned against a banned-term list
//    (coordinate patterns, unit/speed/range figures, 'AES-', etc.) and
//    contains none"
//
// Pure scanner function. Intentionally dependency-free and
// side-effect-free — used both as a standalone content-lint utility and by
// the Placeholder_Media fixture test in placeholderMediaRegistry.test.ts.

/**
 * A single banned-term rule: a human-readable label describing what the
 * pattern detects, and the regex used to detect it.
 */
type BannedTermRule = {
  label: string;
  pattern: RegExp;
};

/**
 * Banned-term patterns for Placeholder_Media copy, per design.md's
 * Requirement 5.4 guidance: "coordinate patterns, unit/speed/range
 * figures, 'AES-', etc." — i.e. telemetry-sounding, specific-figure, or
 * location-identifying substrings that must never appear in placeholder
 * (as opposed to approved, real) copy.
 */
const BANNED_TERM_RULES: BannedTermRule[] = [
  {
    label: "coordinate-like pattern",
    // e.g. "12.9716° N", "77.5946E", "28.61 N"
    pattern: /\d{1,3}(\.\d+)?\s*°?\s*[NSEW]\b/i,
  },
  {
    label: "AES encryption standard reference",
    pattern: /AES-\d*/i,
  },
  {
    label: "speed/range/unit figure",
    // e.g. "120 km/h", "45 min", "8 hours", "25 kg", "40 km", "60 mph"
    pattern:
      /\d+(\.\d+)?\s*(km\/h|kmph|mph|km|kg|lbs?|m\/s|kn|min|mins?|hrs?|hours?)\b/i,
  },
  {
    label: "serial/identifier reference",
    pattern: /\b(serial\s*(no\.?|number)|imei|mac address)\b/i,
  },
  {
    label: "GPS reference",
    pattern: /\bGPS\b/i,
  },
];

/**
 * Scans `text` against the banned-term rule list and returns the labels of
 * every rule that matched. Returns an empty array iff `text` contains no
 * banned terms.
 */
export function scanForBannedTerms(text: string): string[] {
  return BANNED_TERM_RULES.filter((rule) => rule.pattern.test(text)).map(
    (rule) => rule.label,
  );
}
