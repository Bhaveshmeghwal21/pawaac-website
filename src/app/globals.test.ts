import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Spec: pawaac-design-language-evolution, Task 3.1
// Requirements: 3.2
// Design: design.md -> Testing Strategy -> Unit/example tests ->
//   "Legacy token migration checklist: --color-red, --color-red-soft,
//    --color-red-dark, --color-cyan no longer appear in globals.css"
//
// Scope corrected per Task 1 (Requirement 3.2's full replacement list also
// covers --color-green and --color-blue, which existed as hue-bearing legacy
// tokens alongside --color-red/-cyan before the monochrome token migration).

const globalsCssPath = join(__dirname, "globals.css");

describe("globals.css legacy token removal", () => {
  const css = readFileSync(globalsCssPath, "utf-8");

  const legacyTokens = [
    "--color-red",
    "--color-red-soft",
    "--color-red-dark",
    "--color-cyan",
    "--color-green",
    "--color-blue",
  ];

  it.each(legacyTokens)("does not declare the legacy token %s", (token) => {
    // Match the token as a CSS custom-property declaration (`--color-red:`),
    // not merely as a substring — this also avoids false positives from
    // `--color-red-soft`/`--color-red-dark` matching a bare `--color-red`
    // substring search.
    const declarationPattern = new RegExp(
      `${token.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\s*:`,
    );
    expect(declarationPattern.test(css)).toBe(false);
  });
});
