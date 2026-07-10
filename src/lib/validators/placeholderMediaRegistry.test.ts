import { describe, expect, it } from "vitest";

// Spec: pawaac-design-language-evolution — Task 36
// Requirements: 5.2
// Design: design.md -> Page Specifications (Homepage / Product_Page /
//   Autonomy_Page / Company_Page / Careers_Page tables, `Placeholder_Media`
//   column — Deployments_Page removed entirely, task 65); Testing Strategy
//   -> Unit/example tests ->
//   "Every Placeholder_Media entry defined in this design has either a
//    non-empty realAssetPaths list or a recorded open Change_Proposal"
//
// This is a fixed, non-generative unit/example test (per this design's
// Testing Strategy classification), not a property test. It transcribes
// every row from design.md's page-specification tables whose
// `Placeholder_Media` column is not "N/A" (rows marked N/A are data
// panels, forms, or preserved existing components — not PlaceholderMedia
// records at all, per design.md's PlaceholderMedia data model) into a
// fixture, then asserts each entry satisfies Requirement 5.2.
//
// Entries with an open Change_Proposal (real photography/imagery pending
// site-owner approval) are recorded with an empty `realAssetPaths` and
// their gating OCP id. Entries with no Change_Proposal are permanent,
// self-contained geometric/abstract treatments (not real photography
// awaiting approval) and are recorded with a non-empty `realAssetPaths`
// pointing at their in-repo generated treatment.

type PlaceholderMediaFixtureEntry = {
  page: string;
  section: string;
  description: string;
  realAssetPaths: string[];
  changeProposalId: string | null;
};

const PLACEHOLDER_MEDIA_FIXTURE: PlaceholderMediaFixtureEntry[] = [
  // Homepage
  {
    page: "Homepage",
    section: "1. Hero",
    description: "Geometric monochrome placeholder (angular drone silhouette line-art), 16:9",
    realAssetPaths: [],
    changeProposalId: "OCP-18",
  },
  {
    page: "Homepage",
    section: "3. Deployment sectors preview",
    description: "Abstract geometric sector icon set (line-art, no real facility imagery)",
    realAssetPaths: [],
    changeProposalId: "OCP-03",
  },
  {
    page: "Homepage",
    section: "4. Autonomy stack teaser",
    description: "Abstract system-diagram placeholder (geometric nodes/lines)",
    realAssetPaths: ["generated:homepage-autonomy-stack-diagram"],
    changeProposalId: null,
  },
  {
    page: "Homepage",
    section: "5. Coverage planner CTA",
    description: "Static screenshot-style geometric map placeholder",
    realAssetPaths: ["generated:homepage-planner-preview"],
    changeProposalId: null,
  },
  {
    page: "Homepage",
    section: "6. Enterprise & critical-infrastructure framing",
    description: "Abstract geometric facility placeholder",
    realAssetPaths: [],
    changeProposalId: "OCP-04",
  },
  // Product_Page
  {
    page: "Product_Page",
    section: "1. Hero / hardware overview",
    description: "Geometric drone-outline placeholder, 4:5 aspect-boxed",
    realAssetPaths: [],
    changeProposalId: "OCP-06",
  },
  {
    page: "Product_Page",
    section: "4. Dock & charging",
    description: "Abstract geometric dock-diagram placeholder",
    realAssetPaths: [],
    changeProposalId: "OCP-08",
  },
  // Autonomy_Page
  {
    page: "Autonomy_Page",
    section: "1. Hero / autonomy thesis",
    description: "Geometric placeholder",
    realAssetPaths: ["generated:autonomy-hero-geometric"],
    changeProposalId: null,
  },
  {
    page: "Autonomy_Page",
    section: "2. Vision AI illustrative overlay",
    description: "Abstract geometric detection-box mockup over a non-photographic background",
    realAssetPaths: ["generated:autonomy-vision-overlay-mockup"],
    changeProposalId: null,
  },
  {
    page: "Autonomy_Page",
    section: "3. Planning & dispatch logic",
    description: "Geometric node-diagram placeholder",
    realAssetPaths: ["generated:autonomy-flow-diagram"],
    changeProposalId: null,
  },
  // Deployments_Page removed entirely (task 65) — its 4 fixture rows
  // (previously gated on OCP-10/11/12/13) have been removed along with the
  // page. See design.md's Property 8 retirement note.
  // Company_Page
  {
    page: "Company_Page",
    section: "1. Company hero",
    description: "Abstract geometric placeholder",
    realAssetPaths: [],
    changeProposalId: "OCP-15",
  },
  {
    page: "Company_Page",
    section: "3. Team / careers teaser",
    description: "Abstract geometric placeholder",
    realAssetPaths: [],
    changeProposalId: "OCP-16",
  },
  // Careers_Page
  {
    page: "Careers_Page",
    section: "1. Careers hero",
    description: "Abstract geometric placeholder",
    realAssetPaths: [],
    changeProposalId: "OCP-17",
  },
];

/** The 18 total Change_Proposal IDs recorded in design.md (OCP-01 through OCP-18). */
const ALL_CHANGE_PROPOSAL_IDS = Array.from(
  { length: 18 },
  (_, i) => `OCP-${String(i + 1).padStart(2, "0")}`,
);

describe("Placeholder_Media registry (Requirement 5.2)", () => {
  it.each(PLACEHOLDER_MEDIA_FIXTURE)(
    "$page $section has a realAssetPaths entry or a recorded Change_Proposal",
    ({ realAssetPaths, changeProposalId }) => {
      const hasAssetPath = realAssetPaths.length > 0;
      const hasChangeProposal = changeProposalId !== null;
      expect(hasAssetPath || hasChangeProposal).toBe(true);
    },
  );

  it("every recorded changeProposalId is one of the 18 known Change_Proposal IDs", () => {
    for (const entry of PLACEHOLDER_MEDIA_FIXTURE) {
      if (entry.changeProposalId !== null) {
        expect(ALL_CHANGE_PROPOSAL_IDS).toContain(entry.changeProposalId);
      }
    }
  });
});
