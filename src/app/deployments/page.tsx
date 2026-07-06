import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 12 (Deployments_Page route)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4, 6.2, 6.3
// Design: design.md -> Page Specifications -> Deployments_Page
//
// Establishes the new `/deployments` route as its own dedicated route (not
// an anchor), per Requirement 1.1's literal text. Content is composed from
// four net-new section components — DeploymentsDefense, DeploymentsPolice,
// DeploymentsIndustrial, DeploymentsInfrastructure — each carrying exactly
// one sector label from the fixed set {defense, police, industrial,
// infrastructure} (Requirement 6.2). `src/components/sections/Traction.tsx`
// and `src/app/page.tsx` are left untouched; Traction.tsx still renders on
// the Homepage until task 16.
//
// Persona ordering (Property 7, Requirement 6.3): the two
// Defense_Police_Persona sections (defense, police) render before the two
// Enterprise_Persona sections (industrial, infrastructure), matching
// design.md's Deployments_Page table order exactly.
import DeploymentsDefense from "@/components/sections/DeploymentsDefense";
import DeploymentsPolice from "@/components/sections/DeploymentsPolice";
import DeploymentsIndustrial from "@/components/sections/DeploymentsIndustrial";
import DeploymentsInfrastructure from "@/components/sections/DeploymentsInfrastructure";

export const metadata: Metadata = {
  title: "Deployments · PAWAAC Drones",
  description:
    "Where Pawaac autonomous drones operate: border and perimeter defense, police patrol, industrial site security, and critical infrastructure protection.",
};

export default function DeploymentsPage() {
  return (
    <>
      <DeploymentsDefense />
      <DeploymentsPolice />
      <DeploymentsIndustrial />
      <DeploymentsInfrastructure />
    </>
  );
}
