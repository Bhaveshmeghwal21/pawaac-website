import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 60 (Commitments_Page route)
// Requirements: 4.1, 4.3
// Design: design.md -> Page Specifications -> Commitments_Page
//
// Establishes the new `/commitments` route, linked from Navigation's
// Resources dropdown (task 57). OCP-20 (specific commitment claims) stays
// open, so only generic rule-list labels are rendered — see
// CommitmentsPrinciples.tsx.
import CommitmentsPrinciples from "@/components/sections/CommitmentsPrinciples";

export const metadata: Metadata = {
  title: "Our Commitments · PAWAAC Drones",
  description: "Our principles for safety, oversight, and data handling.",
};

export default function CommitmentsPage() {
  return <CommitmentsPrinciples />;
}
