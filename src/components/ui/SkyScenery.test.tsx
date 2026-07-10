// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import SkyScenery from "./SkyScenery";

// Spec: pawaac-design-language-evolution follow-up — site-owner-requested
// full-bleed SkyScenery backdrop.
// Requirements: 10.6
// Design: design.md -> Correctness Properties -> Property 12
//
// Verifies SkyScenery is marked purely decorative (aria-hidden,
// pointer-events-none, excluded from the tab order) and that it renders
// the real sky photo.
//
// Note: the previous CSS cloud-blob drift animation (and its
// prefers-reduced-motion handling, Requirement 9.8) was removed when this
// component was switched from a CSS-gradient abstract sky to a real photo
// (see SkyScenery.tsx) — there is no motion left in this component to test
// for reduced-motion behavior, so that assertion has been dropped rather
// than kept as a no-op.

describe("SkyScenery", () => {
  it("renders as a single aria-hidden, pointer-events-none root layer (Requirement 10.6)", () => {
    const { container } = render(<SkyScenery />);
    const root = container.firstElementChild as HTMLElement;

    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.className).toContain("pointer-events-none");
  });

  it("renders no focusable descendants", () => {
    const { container } = render(<SkyScenery />);
    expect(container.querySelectorAll("a, button, input, select, textarea")).toHaveLength(0);
  });

  it("renders the real sky photo with priority (LCP-relevant, above the fold)", () => {
    const { container } = render(<SkyScenery />);
    const img = container.querySelector("img");

    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toContain("skyimage2.jpg");
  });
});
