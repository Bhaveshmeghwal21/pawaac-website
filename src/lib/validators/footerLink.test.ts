import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { isFooterLinkMarkerValid, type FooterLink } from "./footerLink";

// Spec: pawaac-design-language-evolution — Task 34.1
// Requirements: 2.3
// Design: design.md -> Correctness Properties -> Property 13

describe("isFooterLinkMarkerValid", () => {
  it("returns true for an external link that renders the marker", () => {
    expect(
      isFooterLinkMarkerValid({
        label: "Bajrang Dronetech Pvt Ltd",
        href: "https://bajrangdronetech.example",
        isExternal: true,
        markerRendered: true,
      }),
    ).toBe(true);
  });

  it("returns false for an external link missing the marker", () => {
    expect(
      isFooterLinkMarkerValid({
        label: "Analyser",
        href: "https://analyser.example",
        isExternal: true,
        markerRendered: false,
      }),
    ).toBe(false);
  });

  it("returns true for an internal link with no marker", () => {
    expect(
      isFooterLinkMarkerValid({
        label: "Careers",
        href: "/careers",
        isExternal: false,
        markerRendered: false,
      }),
    ).toBe(true);
  });

  it("returns false for an internal link that incorrectly renders a marker", () => {
    expect(
      isFooterLinkMarkerValid({
        label: "Contact",
        href: "/contact",
        isExternal: false,
        markerRendered: true,
      }),
    ).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 13: For any list of FooterLink records, markerRendered equals isExternal for every entry — the marker renders on every external link and on no internal link.
  it("property: for any array of FooterLink-like records, each entry's validity matches markerRendered === isExternal", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            label: fc.string(),
            href: fc.string(),
            isExternal: fc.boolean(),
            markerRendered: fc.boolean(),
          }),
          { maxLength: 20 },
        ),
        (links: FooterLink[]) => {
          for (const link of links) {
            expect(isFooterLinkMarkerValid(link)).toBe(
              link.markerRendered === link.isExternal,
            );
          }
        },
      ),
    );
  });
});
