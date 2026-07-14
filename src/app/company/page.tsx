import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 13 (Company_Page route)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Company_Page
//
// Establishes the new `/company` route. This is entirely net-new content —
// no existing homepage section covers a "company" narrative, so there is
// nothing to migrate here. Content is composed from three section
// components (Company hero, Mission & approach, Team / careers teaser)
// built fresh for this route, per design.md's Company_Page table.
//
// Persona ordering: all three sections are tagged "Both" — there is no
// Defense_Police_Persona or Enterprise_Persona-only section on this page,
// so the ordering constraint from Property 7 is trivially satisfied by
// rendering in table order.
import CompanyHero from "@/components/sections/CompanyHero";
import CompanyMission from "@/components/sections/CompanyMission";
import CompanyTeam from "@/components/sections/CompanyTeam";

export const metadata: Metadata = {
  title: "Company · PAWAAC Drones",
  description:
    "The team building Pawaac, engineering autonomy for the field.",
};

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <CompanyMission />
      <CompanyTeam />
    </>
  );
}
