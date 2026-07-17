"use client";

// HomeClosingVision — closing cinematic mission-statement section, added
// per explicit site-owner request (current session) as a 9th Homepage
// section, rendered after HomeContactBand and directly above Footer.
//
// This reintroduces the "closing vision section" role originally
// specified in WEBSITE_PLAN.md's SECTION 11 ("THE VISION") and flagged as
// outstanding in HOMEPAGE_MISSING_PARTS.md ("Add the closing vision
// section... a full-width cinematic landscape or aerial visual supports a
// large mission statement, concise supporting copy...") — that role was
// deliberately dropped during the Task 16 curation down to 8 sections
// (see page.tsx's comments on Vision.tsx), but the site owner has now
// asked for an equivalent closing section back, modeled directly on a
// reference screenshot they supplied (a full-bleed dark section with a
// large mission-style closing line sitting just above the footer nav).
//
// Deliberately reuses the site's existing (fixed) SkyScenery backdrop
// rather than introducing a second background image — consistent with
// every other section on the page, which all show SkyScenery through a
// semi-transparent tint rather than each having their own background.
// No Change_Proposal gates this section: the copy below is a mission
// statement, not a numeral/metric/deployment claim, so nothing here
// requires OCP-style gating.
//
// Headline removal (site-owner request, current session): the section's
// h2 headline ("Autonomous eyes, so critical sites never go dark.") was
// removed per explicit request. The "Vision" label and supporting
// sentence remain; the section itself is unchanged otherwise.
import Reveal from "@/components/ui/Reveal";

export default function HomeClosingVision() {
  return (
    <section className="relative overflow-hidden bg-bg/70 px-6 py-32 md:py-44">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="label justify-center">Vision</p>
          <p className="mx-auto mt-5 max-w-xl text-body font-body text-muted">
            Pawaac exists to make continuous, pilotless coverage the
            default for the places that can least afford a gap in
            watch — borders, bases, and the infrastructure a country
            runs on.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
