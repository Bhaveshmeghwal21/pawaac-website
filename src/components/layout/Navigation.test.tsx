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

// Spec: pawaac-design-language-evolution — Task 57 (supersedes Task 36's
// original 5-item assumption)
// Requirements: 1.1, 1.5, 1.6
// Design: design.md -> Shared Components -> Header / Navigation
//
// Product, Autonomy, and Company are real links. Resources has no own
// route — it is a dropdown trigger only (rendered as a <button>) — so it
// is asserted separately by role "button", not role "link".
const EXPECTED_PRIMARY_LINK_ITEMS = [
  { label: "Product", href: "/product" },
  { label: "Autonomy", href: "/autonomy" },
  { label: "Company", href: "/company" },
];

describe("Navigation", () => {
  it("renders exactly 4 primary items, in order — Product, Autonomy, Resources, Company (Requirement 1.1)", () => {
    render(<Navigation />);

    const items = EXPECTED_PRIMARY_LINK_ITEMS.map((item) =>
      screen.getByRole("link", { name: item.label }),
    );
    items.forEach((link, i) => {
      expect(link).toHaveAttribute("href", EXPECTED_PRIMARY_LINK_ITEMS[i].href);
    });

    // Resources renders as a dropdown trigger (button), not a link, since
    // it has no own route.
    expect(
      screen.getByRole("button", { name: /Resources/ }),
    ).toBeInTheDocument();

    // Exactly 4 primary items total, no more, no fewer.
    const allPrimaryTriggers = [
      ...EXPECTED_PRIMARY_LINK_ITEMS.map((item) =>
        screen.getAllByRole("link", { name: item.label }),
      ).flat(),
      screen.getByRole("button", { name: /Resources/ }),
    ];
    expect(allPrimaryTriggers).toHaveLength(4);
  });

  it("renders the 4 primary items in the exact visual/DOM order — Product, Autonomy, Resources, Company (Requirement 1.1)", () => {
    // Spec: pawaac-design-language-evolution — Task 17.1
    // Requirements: 1.1, 1.7
    //
    // The two tests above assert hrefs and item count in isolation, but
    // neither confirms Resources' *position* relative to Product, Autonomy,
    // and Company (it's a <button>, not an <a>, so it's excluded from the
    // getAllByRole("link") DOM-order check further below in this file).
    // This test walks the actual desktop primary-nav <ul> directly and
    // asserts the full 4-item label order in one place.
    render(<Navigation />);

    const desktopList = document.querySelector("nav > ul");
    expect(desktopList).not.toBeNull();
    const itemLabels = Array.from(desktopList!.children).map(
      (li) => li.querySelector("a, button")?.textContent?.replace(/▾$/, "").trim(),
    );
    expect(itemLabels).toEqual(["Product", "Autonomy", "Resources", "Company"]);
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

  it("renders the 3 linked primary items as <a> tags in DOM order matching their visual order (Requirement 10.4)", () => {
    render(<Navigation />);

    // Spec: pawaac-design-language-evolution — Company dropdown follow-up
    // Requirements: 1.1, 1.5, 10.4
    //
    // Scoped to each primary <li>'s *own* trigger element (mirroring the
    // "exact visual/DOM order" test above), rather than a flat href filter
    // over every link on the page. This is necessary now that Company's
    // dropdown includes an "About Us" child that intentionally also points
    // to /company — a flat href filter would double-count that href and
    // break this assertion, even though the top-level trigger order itself
    // is unaffected.
    const desktopList = document.querySelector("nav > ul");
    expect(desktopList).not.toBeNull();
    const topLevelTriggerHrefs = Array.from(desktopList!.children)
      .map((li) => li.querySelector("a, button"))
      .filter((el) => el?.tagName === "A")
      .map((a) => a!.getAttribute("href"));

    expect(topLevelTriggerHrefs).toEqual(
      EXPECTED_PRIMARY_LINK_ITEMS.map((item) => item.href),
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
// across the full site: Navigation's primary links resolve to real routes)
// Requirements: 1.1, 1.3, 1.4
// Design: design.md -> Testing Strategy
//
// Confirms Navigation's 3 linked primary hrefs (Product, Autonomy,
// Company — Resources has no own route) exactly match real
// `src/app/**/page.tsx` routes, by checking each href resolves to an
// actual `page.tsx` file on disk under `src/app`.
describe("Navigation route wiring (Requirement 1.1)", () => {
  it("every linked primary item's href resolves to a real src/app/**/page.tsx route", () => {
    const appDir = join(__dirname, "..", "..", "app");

    EXPECTED_PRIMARY_LINK_ITEMS.forEach((item) => {
      const routeDir = item.href.replace(/^\//, "");
      const pagePath = join(appDir, routeDir, "page.tsx");
      expect(existsSync(pagePath)).toBe(true);
    });
  });
});

// Spec: pawaac-design-language-evolution — Task 57
// Requirements: 1.1, 2.3
// Design: design.md -> Shared Components -> Header / Navigation
//   (Resources_Menu dropdown contents)
//
// Analogous to the "Navigation Product dropdown" block above: Resources
// exposes a dropdown with 4 sublinks (Planner, Log Analyser, News, Our
// Commitments). Log Analyser is external and carries the
// External_Link_Marker treatment; the other 3 do not.
describe("Navigation Resources dropdown", () => {
  const EXPECTED_RESOURCES_SUBLINKS = [
    { label: "Planner", href: "/designer" },
    { label: "Log Analyser", href: "https://analyse.bajrangdrone.tech" },
    { label: "News", href: "/news" },
    { label: "Our Commitments", href: "/commitments" },
  ];

  it("renders all 4 Resources sublinks with the correct hrefs", () => {
    render(<Navigation />);

    EXPECTED_RESOURCES_SUBLINKS.forEach((item) => {
      const link = screen.getByRole("link", { name: new RegExp(item.label) });
      expect(link).toHaveAttribute("href", item.href);
    });
  });

  it('renders "Log Analyser" with the External_Link_Marker (opens external site) and target="_blank"', () => {
    render(<Navigation />);

    const logAnalyser = screen.getByRole("link", { name: /Log Analyser/ });
    expect(logAnalyser).toHaveAttribute("target", "_blank");
    expect(logAnalyser).toHaveAttribute("rel", "noopener noreferrer");
    expect(logAnalyser).toHaveAccessibleName(
      "Log Analyser (opens external site)",
    );
  });

  it("does not render the External_Link_Marker on Planner, News, or Our Commitments", () => {
    render(<Navigation />);

    const internalLabels = ["Planner", "News", "Our Commitments"];
    internalLabels.forEach((label) => {
      const link = screen.getByRole("link", { name: new RegExp(`^${label}$`) });
      expect(link).not.toHaveAttribute("target");
      expect(link.textContent).not.toContain("opens external site");
    });
  });
});

// User-requested follow-up: the site owner reported "there is no careers
// page, about us, contact us page in ... Company section" and asked that
// Company become a dropdown exposing those three, "default company page
// as well" — mirroring the existing Product/Resources dropdown pattern.
// Company keeps href="/company" (unlike Resources) so clicking the
// "Company" label itself still navigates, matching Product's
// both-link-AND-trigger behavior.
describe("Navigation Company dropdown", () => {
  const EXPECTED_COMPANY_SUBLINKS = [
    { label: "About Us", href: "/company" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ];

  it("renders all 3 Company sub-links with the correct hrefs, in order", () => {
    render(<Navigation />);

    const links = EXPECTED_COMPANY_SUBLINKS.map((item) =>
      screen.getByRole("link", { name: item.label }),
    );
    links.forEach((link, i) => {
      expect(link).toHaveAttribute("href", EXPECTED_COMPANY_SUBLINKS[i].href);
    });
  });

  it('"Company" itself still renders as a real <a href="/company"> trigger, not a dropdown-only button', () => {
    render(<Navigation />);

    // getByRole with an exact name excludes the dropdown's "About Us" child
    // (different accessible name), so this resolves uniquely to the
    // top-level Company trigger.
    const companyTrigger = screen.getByRole("link", { name: "Company" });
    expect(companyTrigger.tagName).toBe("A");
    expect(companyTrigger).toHaveAttribute("href", "/company");
    expect(companyTrigger).toHaveAttribute("aria-haspopup", "true");
  });

  it("every Company sub-link href resolves to a real src/app/**/page.tsx route", () => {
    const appDir = join(__dirname, "..", "..", "app");

    EXPECTED_COMPANY_SUBLINKS.forEach((item) => {
      const routeDir = item.href.replace(/^\//, "");
      const pagePath = join(appDir, routeDir, "page.tsx");
      expect(existsSync(pagePath)).toBe(true);
    });
  });
});
