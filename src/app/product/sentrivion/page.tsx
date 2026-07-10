import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 67 (Sentrivion Sub-Page route)
// Requirements: 1.1, 4.1, 4.3, 4.4, 5.1, 5.4, 9.6
// Design: design.md -> Page Specifications -> Sentrivion Product Sub-Page
//
// Rewrites the placeholder that previously lived here into a full page
// with 3 sections, per design.md's resolved OCP-07 real
// brochure-confirmed content: hero (real photo), capability
// Pinned_Spec_Sheet (real numerals, no endurance/weight/payload numeral —
// see SentrivionSpecs.tsx's caveat), and autonomy/AI capabilities
// secondary disclosure rule-list. Persona ordering: Sections 1-2 are
// Defense_Police_Persona, Section 3 is Both — table order already
// satisfies Property 7.
import SentrivionHero from "@/components/sections/SentrivionHero";
import SentrivionSpecs from "@/components/sections/SentrivionSpecs";
import SentrivionCapabilities from "@/components/sections/SentrivionCapabilities";

export const metadata: Metadata = {
  title: "Sentrivion · PAWAAC Drones",
  description:
    "Sentrivion: long endurance, autonomous VTOL built for surveillance and mapping.",
};

export default function SentrivionPage() {
  return (
    <>
      <SentrivionHero />
      <SentrivionSpecs />
      <SentrivionCapabilities />
    </>
  );
}
