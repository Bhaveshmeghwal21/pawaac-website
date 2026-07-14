// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Spec: pawaac-design-language-evolution — Task 36 (follow-up gap closure)
// Requirements: 1.3, 1.4, 2.1, 2.2
// Design: design.md -> Testing Strategy -> Unit/example tests; Shared
//   Components -> Footer

describe("Footer", () => {
  it("renders the Careers link pointing to /careers (Requirement 1.3)", () => {
    render(<Footer />);
    const careers = screen.getByRole("link", { name: "Careers" });
    expect(careers).toHaveAttribute("href", "/careers");
  });

  it("renders the Contact link pointing to /contact (Requirement 1.4)", () => {
    render(<Footer />);
    const contact = screen.getByRole("link", { name: "Contact" });
    expect(contact).toHaveAttribute("href", "/contact");
  });

  it('renders the Corporate_Site link naming "Bajrang Dronetech Pvt Ltd" and excluding "PAWAAC" in any casing (Requirement 2.1)', () => {
    render(<Footer />);
    const corporateLink = screen.getByRole("link", {
      name: /Bajrang Dronetech Pvt Ltd/,
    });
    expect(corporateLink).toBeInTheDocument();
    expect(corporateLink.textContent?.toUpperCase()).not.toContain("PAWAAC");
  });

  it('renders the Analyser link with text including "Beta" (Requirement 2.2)', () => {
    render(<Footer />);
    const analyserLink = screen.getByRole("link", { name: /Beta/ });
    expect(analyserLink).toBeInTheDocument();
    expect(analyserLink.textContent).toContain("Beta");
  });
});

// Spec: pawaac-design-language-evolution — Task 18.1
// Requirements: 1.3, 1.4, 2.1, 2.2, 2.3
// Design: design.md -> Shared Components -> Footer; Correctness Property 13
//   (External-link marker correctness: markerRendered === isExternal)
//
// The block above confirms link destinations/text but not the
// External_Link_Marker's presence/absence per link type. This block adds
// that explicit assertion — the marker (an aria-hidden "↗" glyph
// immediately followed by visually-hidden "(opens external site)" text)
// must render on both external links (Corporate_Site, Analyser) and on
// neither internal link (Careers, Contact).
describe("Footer External_Link_Marker placement (Property 13)", () => {
  it('renders the aria-hidden "↗" marker glyph + visually-hidden "(opens external site)" text on the Corporate_Site link (external)', () => {
    render(<Footer />);
    const corporateLink = screen.getByRole("link", {
      name: /Bajrang Dronetech Pvt Ltd/,
    });
    expect(corporateLink.querySelector('[aria-hidden="true"]')).toHaveTextContent("↗");
    expect(corporateLink).toHaveAccessibleName(
      "Bajrang Dronetech Pvt Ltd (opens external site)",
    );
    expect(corporateLink).toHaveAttribute("target", "_blank");
    expect(corporateLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it('renders the aria-hidden "↗" marker glyph + visually-hidden "(opens external site)" text on the Analyser link (external)', () => {
    render(<Footer />);
    const analyserLink = screen.getByRole("link", { name: /Beta/ });
    expect(analyserLink.querySelector('[aria-hidden="true"]')).toHaveTextContent("↗");
    expect(analyserLink).toHaveAccessibleName(
      "Pawaac Analyser (Beta) (opens external site)",
    );
    expect(analyserLink).toHaveAttribute("target", "_blank");
    expect(analyserLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no External_Link_Marker and no target on the Careers link (internal)", () => {
    render(<Footer />);
    const careersLink = screen.getByRole("link", { name: "Careers" });
    expect(careersLink.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(careersLink.textContent).not.toContain("opens external site");
    expect(careersLink).not.toHaveAttribute("target");
    expect(careersLink).toHaveAccessibleName("Careers");
  });

  it("renders no External_Link_Marker and no target on the Contact link (internal)", () => {
    render(<Footer />);
    const contactLink = screen.getByRole("link", { name: "Contact" });
    expect(contactLink.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(contactLink.textContent).not.toContain("opens external site");
    expect(contactLink).not.toHaveAttribute("target");
    expect(contactLink).toHaveAccessibleName("Contact");
  });
});
