// Spec: pawaac-design-language-evolution — Tasks 23, 24
// Requirements: 3.4, 3.5, 3.6, 3.7, 3.8
// Design: design.md -> Correctness Properties -> Property 2, Property 3
//   "Foreground/background contrast-direction correctness"
//   "Contrast ratio compliance"
//
// Pure validator/calculator functions backing Properties 2 and 3. These are
// intentionally dependency-free and side-effect-free.

/** A single sRGB channel value in [0, 255]. */
function linearizeChannel(c: number): number {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

/**
 * Computes the WCAG 2.1 relative luminance of an sRGB color, given r/g/b
 * channel values each in [0, 255].
 *
 * Formula: L = 0.2126*R + 0.7152*G + 0.0722*B, where R/G/B are the
 * linearized channel values.
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const R = linearizeChannel(r);
  const G = linearizeChannel(g);
  const B = linearizeChannel(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Resolves the foreground direction ("white" or "black") that should be
 * paired with a background of the given r/g/b channel values, per
 * design.md's Property 2: backgrounds whose relative luminance is below the
 * dark/light midpoint (0.5) pair with a white/near-white foreground;
 * backgrounds at or above the midpoint pair with a black/near-black
 * foreground.
 */
export function resolveForegroundDirection(
  bgR: number,
  bgG: number,
  bgB: number,
): "white" | "black" {
  return relativeLuminance(bgR, bgG, bgB) < 0.5 ? "white" : "black";
}

/**
 * Computes the WCAG contrast ratio between two relative luminance values,
 * per the standard formula: (lighter + 0.05) / (darker + 0.05).
 */
export function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastCategory = "body" | "heading" | "interactive";

/**
 * The minimum WCAG 2.1 contrast ratio required for each contrast category,
 * per design.md's Property 3 / Requirements 3.6-3.8:
 * - "body": 4.5:1 (body text under 24px)
 * - "heading": 3:1 (heading text sized 24px or larger)
 * - "interactive": 3:1 (non-text interactive-shade/adjacent-background boundary)
 */
export const CONTRAST_THRESHOLDS: Record<ContrastCategory, number> = {
  body: 4.5,
  heading: 3,
  interactive: 3,
};

/**
 * Returns true iff the computed WCAG contrast ratio between the given
 * foreground and background achromatic (or any) colors meets the threshold
 * required for the given category.
 */
export function meetsContrastThreshold(
  fgR: number,
  fgG: number,
  fgB: number,
  bgR: number,
  bgG: number,
  bgB: number,
  category: ContrastCategory,
): boolean {
  const ratio = contrastRatio(
    relativeLuminance(fgR, fgG, fgB),
    relativeLuminance(bgR, bgG, bgB),
  );
  return ratio >= CONTRAST_THRESHOLDS[category];
}
