import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Commitments_Page restructure
// (resolves OCP-20, supersedes the original Task 60 single-section route)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Commitments_Page ("Our
//         Vision & Commitments")
//
// The `/commitments` route (unchanged — still linked from Navigation's
// Resources dropdown, task 57) now renders 4 sections instead of 1:
//   1. VisionHero              — "Our Vision" (founder-authored)
//   2. VisionIntro              — "Introducing Pawaac" (founder-authored)
//   3. VisionPillars            — "What we're building toward" (founder-authored)
//   4. CommitmentsPrinciples    — "Our Commitments" (unchanged content)
//
// OCP-20 (Commitments_Page real commitment copy) is now RESOLVED: the
// founder supplied and approved the real copy for Sections 1-3 above; see
// design.md's Resolved Change Proposals table.
//
// Persona ordering: all 4 sections are tagged "Both" — there is no
// Defense_Police_Persona or Enterprise_Persona-only section on this page,
// so the ordering constraint from Property 7 is trivially satisfied by
// rendering in table order.
import VisionHero from "@/components/sections/VisionHero";
import VisionIntro from "@/components/sections/VisionIntro";
import VisionPillars from "@/components/sections/VisionPillars";
import CommitmentsPrinciples from "@/components/sections/CommitmentsPrinciples";

export const metadata: Metadata = {
  title: "Our Vision & Commitments · PAWAAC Drones",
  description:
    "Why Pawaac exists, what we're building toward, and our principles for safety, oversight, and data handling.",
};

export default function CommitmentsPage() {
  return (
    <>
      <VisionHero />
      <VisionIntro />
      <VisionPillars />
      <CommitmentsPrinciples />
    </>
  );
}
