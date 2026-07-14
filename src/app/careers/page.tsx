import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 15 (Careers_Page route)
// Requirements: 1.1, 1.3, 4.1, 5.1, 5.4, 9.2
// Design: design.md -> Page Specifications -> Careers_Page
//
// Establishes the new `/careers` route. This is entirely net-new content —
// no existing homepage section covers a "careers" narrative, so there is
// nothing to migrate here. Content is composed from two section components
// (CareersHero, CareersApplicationForm) built fresh for this route, per
// design.md's Careers_Page table.
//
// Persona ordering: both sections are tagged "Both", so the ordering
// constraint from Property 7 is trivially satisfied by rendering in table
// order.
import CareersHero from "@/components/sections/CareersHero";
import CareersApplicationForm from "@/components/sections/CareersApplicationForm";

export const metadata: Metadata = {
  title: "Careers · PAWAAC Drones",
  description: "We hire for hardware, autonomy software, and field operations.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersApplicationForm />
    </>
  );
}
