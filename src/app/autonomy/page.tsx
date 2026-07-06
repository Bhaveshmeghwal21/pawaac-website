import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 11 (Autonomy_Page route)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4, 8.4
// Design: design.md -> Page Specifications -> Autonomy_Page
//
// Establishes the new `/autonomy` route. Content is composed from four new
// section components — AutonomyHero, AutonomyVisionAI, AutonomyDispatch,
// AutonomySafeguards — built fresh for this route (VisionAI.tsx and
// DecisionOS.tsx are left untouched; they still render on the Homepage
// until task 16). Persona ordering: Sections 1-2 are
// Defense_Police_Persona, Sections 3-4 are Both; there is no
// Enterprise_Persona-only section on this page, so the ordering constraint
// from Property 7 is trivially satisfied by rendering in table order.
import AutonomyHero from "@/components/sections/AutonomyHero";
import AutonomyVisionAI from "@/components/sections/AutonomyVisionAI";
import AutonomyDispatch from "@/components/sections/AutonomyDispatch";
import AutonomySafeguards from "@/components/sections/AutonomySafeguards";

export const metadata: Metadata = {
  title: "Autonomy · PAWAAC Drones",
  description:
    "Onboard autonomy senses, classifies, and acts without a constant human link.",
};

export default function AutonomyPage() {
  return (
    <>
      <AutonomyHero />
      <AutonomyVisionAI />
      <AutonomyDispatch />
      <AutonomySafeguards />
    </>
  );
}
