// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
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
