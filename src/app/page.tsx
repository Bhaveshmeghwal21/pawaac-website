// Spec: pawaac-design-language-evolution — Task 16 (Update Homepage to
// curated 8-section set)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage
//
// Replaces the old single-page render tree (Hero, Problem, DroneShowcase,
// Simplicity, VisionAI, DecisionOS, Traction, Gallery, Vision, Contact)
// with the curated 8-section set from design.md's Homepage table:
//   1. HomeHero                  (Defense_Police_Persona)
//   2. HomeSpecSheet             (Defense_Police_Persona)
//   3. HomeDeploymentsPreview    (Defense_Police_Persona)
//   4. HomeAutonomyTeaser        (Both)
//   5. HomePlannerCTA            (Both)
//   6. HomeEnterpriseFraming     (Enterprise_Persona)
//   7. HomeCompanyStrip          (Both)
//   8. HomeContactBand           (Both)
//
// DroneShowcase (migrated to /product, task 10), VisionAI and DecisionOS
// (migrated to /autonomy, task 11), Traction (migrated to /deployments,
// task 12), and Contact (migrated to /contact, task 14) are removed from
// this render tree. Those component files are left on disk, unused,
// consistent with the "don't delete, don't break things" convention
// already used by tasks 10-15.
//
// Problem.tsx, Simplicity.tsx, Gallery.tsx, and Vision.tsx are also removed
// from this render tree rather than adapted, because none of their content
// maps cleanly onto one of the 8 specified sections above without either
// duplicating another section's content or introducing a 9th/10th
// "orphaned" section not represented in design.md's Homepage table:
//   - Problem.tsx (unconfirmed stat counters — border km, patrol coverage,
//     etc.) duplicates the "field-readiness" framing HomeSpecSheet already
//     covers, and its numerals are exactly the kind of unconfirmed figure
//     OCP-02 gates — keeping it would smuggle ungated numerals onto the
//     page.
//   - Simplicity.tsx ("how it works" steps) overlaps with the autonomy
//     narrative now owned by HomeAutonomyTeaser (Section 4) and, in more
//     detail, by Autonomy_Page itself (task 11) — it is not one of the 8
//     table rows, so it is dropped here rather than kept as an extra
//     section.
//   - Gallery.tsx (photo grid with fabricated captions/locations like
//     "Tawang", "Northern Unit", "ASC Bangalore") is dropped: it is not one
//     of the 8 table rows, and its invented location/unit references are
//     the kind of unverified content Requirement 8.1 constrains — its
//     imagery treatment informed HomeDeploymentsPreview's abstract sector
//     thumbnails instead (Section 3).
//   - Vision.tsx ("data layer for physical security" close-out) overlaps
//     with the company/trust framing now owned by HomeCompanyStrip
//     (Section 7) and the contact framing owned by HomeContactBand
//     (Section 8) — it is not one of the 8 table rows, so it is dropped
//     rather than kept as a 9th section.
// All four files are left on disk, unused, per the same convention noted
// above.
//
// Persona ordering (Property 7 / Requirement 6.1, 6.3): Sections 1-3
// (Defense_Police_Persona) render before Section 6
// (Enterprise_Persona); Sections 4, 5, 7, 8 (Both) sit in table order,
// which is already consistent with that constraint.
import HomeHero from "@/components/sections/HomeHero";
import HomeSpecSheet from "@/components/sections/HomeSpecSheet";
import HomeDeploymentsPreview from "@/components/sections/HomeDeploymentsPreview";
import HomeAutonomyTeaser from "@/components/sections/HomeAutonomyTeaser";
import HomePlannerCTA from "@/components/sections/HomePlannerCTA";
import HomeEnterpriseFraming from "@/components/sections/HomeEnterpriseFraming";
import HomeCompanyStrip from "@/components/sections/HomeCompanyStrip";
import HomeContactBand from "@/components/sections/HomeContactBand";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeSpecSheet />
      <HomeDeploymentsPreview />
      <HomeAutonomyTeaser />
      <HomePlannerCTA />
      <HomeEnterpriseFraming />
      <HomeCompanyStrip />
      <HomeContactBand />
      <Footer />
    </>
  );
}
