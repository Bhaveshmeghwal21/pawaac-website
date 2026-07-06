// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

// Spec: pawaac-design-language-evolution — Task 36 (follow-up gap closure)
// Requirements: 1.1, 1.7, 10.4, 10.5
// Design: design.md -> Testing Strategy -> Unit/example tests; Shared
//   Components -> Header / Navigation
//
// Navigation calls usePathname() from next/navigation, which requires an
// App Router context that isn't present under plain @testing-library/react
// rendering. Mock the hook so the component can render standalone.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

const EXPECTED_PRIMARY_ITEMS = [
  { label: "Product", href: "/product" },
  { label: "Autonomy", href: "/autonomy" },
  { label: "Deployments", href: "/deployments" },
  { label: "Planner", href: "/designer" },
  { label: "Company", href: "/company" },
];

describe("Navigation", () => {
  it("renders exactly 5 primary items, in order, linking to their real routes (Requirement 1.1)", () => {
    render(<Navigation />);

    const items = EXPECTED_PRIMARY_ITEMS.map((item) =>
      screen.getByRole("link", { name: item.label }),
    );

    // Exactly 5 — no more, no fewer — primary nav links in the document.
    const allPrimaryLinks = EXPECTED_PRIMARY_ITEMS.map((item) =>
      screen.getAllByRole("link", { name: item.label }),
    ).flat();
    expect(allPrimaryLinks).toHaveLength(5);

    items.forEach((link, i) => {
      expect(link).toHaveAttribute("href", EXPECTED_PRIMARY_ITEMS[i].href);
    });
  });

  it('activating "Request Demo" navigates to Contact_Page (/contact) (Requirement 1.7)', () => {
    render(<Navigation />);

    const requestDemo = screen.getByRole("link", { name: "Request Demo" });
    expect(requestDemo).toHaveAttribute("href", "/contact");
  });

  it('renders the skip-to-content link as the first focusable <a> element, with href="#main-content" (Requirement 10.5)', () => {
    render(<Navigation />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Skip to content");
    expect(links[0]).toHaveAttribute("href", "#main-content");
  });

  it("renders the 5 primary items as <a> tags in DOM order matching their visual order (Requirement 10.4)", () => {
    render(<Navigation />);

    const links = screen.getAllByRole("link");
    const primaryHrefsInDomOrder = links
      .map((link) => link.getAttribute("href"))
      .filter((href) =>
        EXPECTED_PRIMARY_ITEMS.some((item) => item.href === href),
      );

    expect(primaryHrefsInDomOrder).toEqual(
      EXPECTED_PRIMARY_ITEMS.map((item) => item.href),
    );
  });
});

// User-requested follow-up: "Product" header item exposes a dropdown with
// 4 product-line links (Software Stack, Docking System, Sentrivion,
// HawkAI), each routed to a real src/app/product/**/page.tsx page.
describe("Navigation Product dropdown", () => {
  const EXPECTED_PRODUCT_SUBLINKS = [
    { label: "Software Stack", href: "/product/software-stack" },
    { label: "Docking System", href: "/product/docking-system" },
    { label: "Sentrivion", href: "/product/sentrivion" },
    { label: "HawkAI", href: "/product/hawkai" },
  ];

  it("renders all 4 product sub-links with the correct hrefs", () => {
    render(<Navigation />);

    EXPECTED_PRODUCT_SUBLINKS.forEach((item) => {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    });
  });

  it("every product sub-link href resolves to a real src/app/product/**/page.tsx route", () => {
    const appDir = join(__dirname, "..", "..", "app");

    EXPECTED_PRODUCT_SUBLINKS.forEach((item) => {
      const routeDir = item.href.replace(/^\//, "");
      const pagePath = join(appDir, routeDir, "page.tsx");
      expect(existsSync(pagePath)).toBe(true);
    });
  });
});

// Spec: pawaac-design-language-evolution — Task 38.2 (Verify route wiring
// across the full site: Navigation's 5 links resolve to real routes)
// Requirements: 1.1, 1.3, 1.4
// Design: design.md -> Testing Strategy
//
// Confirms Navigation's 5 primary hrefs exactly match the 5 real
// `src/app/**/page.tsx` routes created by tasks 10-13 and 20 (the
// pre-existing /designer route), by checking each href resolves to an
// actual `page.tsx` file on disk under `src/app`.
describe("Navigation route wiring (Requirement 1.1)", () => {
  it("every primary item's href resolves to a real src/app/**/page.tsx route", () => {
    const appDir = join(__dirname, "..", "..", "app");

    EXPECTED_PRIMARY_ITEMS.forEach((item) => {
      const routeDir = item.href.replace(/^\//, "");
      const pagePath = join(appDir, routeDir, "page.tsx");
      expect(existsSync(pagePath)).toBe(true);
    });
  });
});
