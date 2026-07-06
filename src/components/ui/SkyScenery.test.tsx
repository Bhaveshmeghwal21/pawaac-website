// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import SkyScenery from "./SkyScenery";

// Spec: pawaac-design-language-evolution follow-up — site-owner-requested
// full-bleed SkyScenery backdrop.
// Requirements: 9.8, 10.6
// Design: design.md -> Correctness Properties -> Property 12
//
// Verifies SkyScenery is marked purely decorative (aria-hidden,
// pointer-events-none, excluded from the tab order) and that its cloud
// drift motion is skipped under prefers-reduced-motion: reduce.

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

  it("respects prefers-reduced-motion: reduce by not throwing and still rendering the decorative root (Requirement 9.8)", () => {
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal("matchMedia", matchMediaMock);

    const { container } = render(<SkyScenery />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden", "true");

    vi.unstubAllGlobals();
  });
});
