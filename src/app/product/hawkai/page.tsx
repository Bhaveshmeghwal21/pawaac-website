import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 66 (HawkAI Plus Sub-Page route)
// Requirements: 1.1, 4.1, 4.3, 4.4, 5.1, 5.4, 9.6
// Design: design.md -> Page Specifications -> HawkAI Plus Product Sub-Page
//
// Rewrites the bare 3-line placeholder that previously lived here into a
// full page with 3 sections, per design.md's resolved OCP-07 real
// brochure-confirmed content: hero (real photo), airframe/flight
// Pinned_Spec_Sheet (real numerals), and payload/sensor secondary
// disclosure table. Persona ordering: Section 1-2 are
// Defense_Police_Persona, Section 3 is Both — table order already
// satisfies Property 7.
import HawkAIHero from "@/components/sections/HawkAIHero";
import HawkAISpecs from "@/components/sections/HawkAISpecs";
import HawkAIPayloadDetails from "@/components/sections/HawkAIPayloadDetails";

export const metadata: Metadata = {
  title: "HawkAI Plus · PAWAAC Drones",
  description:
    "HawkAI Plus: a compact tactical platform for surveillance, reconnaissance, and field response.",
};

export default function HawkAIPage() {
  return (
    <>
      <HawkAIHero />
      <HawkAISpecs />
      <HawkAIPayloadDetails />
    </>
  );
}
