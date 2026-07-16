"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 1)
// Requirements: 4.1, 4.3, 4.4, 5.1, 5.4, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 1 (Hero)
//
// Persona: Defense_Police_Persona. Replaces the old, unstyled
// `Hero.tsx` on the Homepage render tree (that file is left on disk,
// unused, per the same "don't break things, don't delete" convention
// used for DroneShowcase/VisionAI/DecisionOS/Traction/Contact) with a
// net-new hero matching design.md's exact Homepage table copy:
// oversized Display_Type word-mark texture behind the hero media (P1),
// Reveal_On_Scroll clip-path entrance (P5). Real hero photography/video
// (OCP-18) stays blocked pending site-owner approval.
//
// Positioning/typography/motion pass (site-owner request): the headline
// is anchored to the site's left content grid in the lower third of the
// frame, below where the drone silhouette sits in the sky photo — a
// deliberate cinematic lower-third rather than free-floating centered copy.
//
// Follow-up sizing/font pass (site-owner request): the headline was sized
// too large/dominant relative to the sky photo and drone silhouette, so
// the scale is brought down from a clamp(...,5.5rem) ceiling to
// clamp(...,3.5rem) — still clearly a hero statement, but no longer
// overwhelming the frame.
//
// Font follow-up (site-owner request): switched back from Inter
// (font-body) to Space Grotesk (font-display) — the same font already
// used for "Building for demanding environments" (HomeSpecSheet.tsx) and
// every other in-page heading — so the hero headline now matches that
// heading's font family exactly, rather than using a different typeface
// for this one section.
//
// Case follow-up (site-owner request, reverted from the prior sentence-case
// change): the headline is uppercase again, per explicit request after
// reviewing the sentence-case version live.
//
// Motion: swapped from Reveal_On_Scroll (Framer Motion clip-path wipe,
// designed for in-page scroll-triggered content) to HeroHeadline.tsx (GSAP
// word-stagger, blur-to-focus + rise), since this is a mount-time hero
// moment rather than a scroll-triggered reveal — see HeroHeadline.tsx.
import HeroHeadline from "@/components/ui/HeroHeadline";

export default function HomeHero() {
  return (
    // bg-bg/80 -> bg-transparent: Hero is the first, most prominent
    // section and now shows the (fixed) SkyScenery backdrop completely
    // unobstructed, rather than through a near-opaque dark tint. See
    // SkyScenery.tsx for the corresponding contrast fix that makes the
    // sky itself actually visible.
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-transparent px-6 pb-[14vh] pt-28 md:pb-[16vh] md:pt-36">
      {/* Display_Type oversized word-mark texture behind hero media
          (Pattern 1), purely decorative — hidden from assistive
          technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        PAWAAC
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl text-left">
        <HeroHeadline
          text="Autonomous systems that protect what matters"
          className="max-w-5xl font-display text-[clamp(2.25rem,4.8vw,4.75rem)] font-bold uppercase leading-[0.94] tracking-[-0.035em] text-fg [text-wrap:balance] [text-shadow:0_3px_18px_rgba(0,0,0,0.7)]"
        />
      </div>
    </section>
  );
}
