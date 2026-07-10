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
