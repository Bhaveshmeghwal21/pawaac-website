// @vitest-environment jsdom
import { describe, expect, it, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import PinnedSpecSheet from "./PinnedSpecSheet";
import Reveal from "./Reveal";
import { UplinkInput, FieldMessage } from "./UplinkField";
import HomeHero from "@/components/sections/HomeHero";
import Navigation from "@/components/layout/Navigation";

// Spec: pawaac-design-language-evolution — Task 8.1
// Requirements: 9.8
// Design: design.md -> Reduced-Motion Fallback Matrix
//
// Verifies each row of the Reduced-Motion Fallback Matrix against the real
// components that implement it, under both `prefers-reduced-motion: reduce`
// and the default (no-preference) motion setting.
//
// `usePrefersReducedMotion` (src/hooks/usePrefersReducedMotion.ts) reads
// `window.matchMedia("(prefers-reduced-motion: reduce)").matches` via a lazy
// `useState` initializer, so mocking `window.matchMedia` *before* each
// `render()` call is sufficient to drive both branches — no `act()`-wrapped
// media-query-change event is needed for these tests.
function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// framer-motion's `whileInView` (used by Reveal_On_Scroll's default,
// non-reduced-motion branch) requires a real IntersectionObserver, which
// jsdom does not implement. Stub a minimal no-op version so the default
// branch can mount without throwing — this test suite only asserts on the
// initial/mount-time DOM output, not on any observer-triggered state
// change.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

afterEach(() => {
  vi.unstubAllGlobals();
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

describe("Reduced-Motion Fallback Matrix — Pinned_Spec_Sheet", () => {
  const panels = [
    { label: "Endurance", numeral: "80+", supportingSentence: "Minutes of flight time." },
    { label: "Range", numeral: "15", supportingSentence: "Kilometers of range." },
  ];

  it("renders an un-pinned static vertical stack with no scroll-jacking under prefers-reduced-motion: reduce", () => {
    mockMatchMedia(true);
    const { container } = render(<PinnedSpecSheet panels={panels} />);

    // StaticStack fallback: plain vertical flex column, no sticky-pin
    // container and no scroll-jacked track height (`{n*100}vh`).
    expect(container.querySelector(".sticky")).toBeNull();
    const vhHeighted = Array.from(container.querySelectorAll<HTMLElement>("*")).some(
      (el) => el.style.height?.endsWith("vh"),
    );
    expect(vhHeighted).toBe(false);

    // Panel content and order are preserved regardless of motion setting.
    const labels = screen.getAllByText(/Endurance|Range/);
    expect(labels[0]).toHaveTextContent("Endurance");
    expect(labels[1]).toHaveTextContent("Range");
  });

  it("renders the sticky-pinned, scroll-jacked track by default (no motion preference)", () => {
    mockMatchMedia(false);
    const { container } = render(<PinnedSpecSheet panels={panels} />);

    // Default ScrollJackedTrack: sticky-pin wrapper present, and the outer
    // container's height is set proportional to panel count (`{n*100}vh`).
    expect(container.querySelector(".sticky")).not.toBeNull();
    const vhHeighted = Array.from(container.querySelectorAll<HTMLElement>("*")).some(
      (el) => el.style.height?.endsWith("vh"),
    );
    expect(vhHeighted).toBe(true);

    // Panel content and order are preserved regardless of motion setting.
    const labels = screen.getAllByText(/Endurance|Range/);
    expect(labels[0]).toHaveTextContent("Endurance");
    expect(labels[1]).toHaveTextContent("Range");
  });
});

describe("Reduced-Motion Fallback Matrix — Reveal_On_Scroll", () => {
  it("renders children directly in their final state, with no clip-path keyframe, under prefers-reduced-motion: reduce", () => {
    mockMatchMedia(true);
    const { container } = render(
      <Reveal>
        <p>Revealed content</p>
      </Reveal>,
    );

    // Fallback branch returns a plain <div>{children}</div> — no
    // clip-path/transform styling anywhere in the subtree.
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
    const clipPathed = Array.from(container.querySelectorAll<HTMLElement>("*")).some(
      (el) => el.style.clipPath,
    );
    expect(clipPathed).toBe(false);
  });

  it("renders the clip-path reveal wrapper by default (no motion preference)", () => {
    mockMatchMedia(false);
    const { container } = render(
      <Reveal>
        <p>Revealed content</p>
      </Reveal>,
    );

    // Final visible content is always present regardless of branch.
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
    // Default branch uses framer-motion's clip-path inset animation — the
    // motion.div carries a clip-path inline style value (its initial/inview
    // state), unlike the reduced-motion fallback's plain <div>.
    const clipPathed = Array.from(container.querySelectorAll<HTMLElement>("*")).some(
      (el) => el.style.clipPath,
    );
    expect(clipPathed).toBe(true);
  });
});

describe("Reduced-Motion Fallback Matrix — Header blur/translucency ramp", () => {
  // Navigation.tsx's scroll-triggered blur ramp (bg-black/72
  // backdrop-blur-[16px] once scrollY > 24px) is driven purely by a
  // `window.scrollY` scroll listener — it does not consume
  // usePrefersReducedMotion at all. Per the matrix's "Preserved regardless"
  // column, header content and nav links must render identically either
  // way; this test confirms that invariant holds under both motion
  // settings, and that the scrolled end-state background is reached under
  // both settings (there is currently no separate reduced-motion branch in
  // Navigation.tsx to gate the CSS transition itself).
  function renderScrolledHeader() {
    const { container } = render(<Navigation />);
    Object.defineProperty(window, "scrollY", { value: 30, configurable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    return container;
  }

  it("reaches the blurred end-state background once scrolled, under prefers-reduced-motion: reduce", () => {
    mockMatchMedia(true);
    const container = renderScrolledHeader();
    const header = container.querySelector("header");
    expect(header?.className).toContain("backdrop-blur-[16px]");
    expect(screen.getByRole("link", { name: "Product" })).toHaveAttribute(
      "href",
      "/product",
    );
  });

  it("reaches the same blurred end-state background once scrolled, by default (no motion preference)", () => {
    mockMatchMedia(false);
    const container = renderScrolledHeader();
    const header = container.querySelector("header");
    expect(header?.className).toContain("backdrop-blur-[16px]");
    expect(screen.getByRole("link", { name: "Product" })).toHaveAttribute(
      "href",
      "/product",
    );
  });
});

describe("Reduced-Motion Fallback Matrix — background-type (Pattern 1) texture", () => {
  // design.md's matrix row is "Oversized background type (Pattern 1)
  // parallax drift, if any". SkyScenery.tsx's own test file documents that
  // its previous cloud-drift motion was removed entirely (no motion left
  // to gate). The other Pattern-1 usage across the site — the oversized
  // Display_Type word-mark/model-name texture layer behind each hero — is
  // likewise a static, aria-hidden <span> with no scroll-linked transform
  // in any Hero component (ProductHero, HomeHero, AutonomyHero, etc.).
  // This test confirms that: the texture layer itself is purely decorative
  // and identical under both motion settings.
  //
  // Note: this assertion is scoped to the texture span itself, not the
  // whole HomeHero subtree — Reveal_On_Scroll (used elsewhere in HomeHero)
  // legitimately pairs its clip-path wipe with a small settle-in
  // translate/scale transform for physical weight (see Reveal.tsx), which
  // is unrelated to this Pattern-1 texture row and must not be conflated
  // with it.
  it("renders the Display_Type background texture as a static, aria-hidden span with no transform, under both motion settings", () => {
    for (const reduced of [true, false]) {
      mockMatchMedia(reduced);
      const { unmount } = render(<HomeHero />);
      const texture = screen.getByText("PAWAAC", { selector: "span" });
      expect(texture).toHaveAttribute("aria-hidden", "true");
      expect(texture.style.transform).toBe("");
      unmount();
    }
  });
});

describe("Reduced-Motion Fallback Matrix — focus indicators", () => {
  // Focus indicators are CSS-only (:focus-visible) and are never suppressed
  // by prefers-reduced-motion (the matrix's "Preserved regardless" column).
  // UplinkInput does not consume usePrefersReducedMotion at all, so the
  // focus-ring classes are present identically under both settings.
  it("always renders the visible focus-ring classes on Uplink_Form fields, under both motion settings", () => {
    for (const reduced of [true, false]) {
      mockMatchMedia(reduced);
      const { unmount } = render(<UplinkInput label="Name" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("focus-visible:outline");
      expect(input.className).toContain(
        "focus-visible:[outline-color:var(--color-interactive)]",
      );
      unmount();
    }
  });
});

describe("Reduced-Motion Fallback Matrix — form submission/validation status", () => {
  // Uplink_Form's validation feedback (FieldMessage) is essential
  // state-change feedback and must never be suppressed by
  // prefers-reduced-motion. FieldMessage does not consume the hook, so its
  // role="alert" output is identical under both settings.
  it('always renders the role="alert" error message, under both motion settings', () => {
    for (const reduced of [true, false]) {
      mockMatchMedia(reduced);
      const { unmount } = render(<FieldMessage error="Required field" />);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Required field");
      unmount();
    }
  });

  it('always renders the role="alert" success message, under both motion settings', () => {
    for (const reduced of [true, false]) {
      mockMatchMedia(reduced);
      const { unmount } = render(<FieldMessage success="Looks good" />);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Looks good");
      unmount();
    }
  });
});
