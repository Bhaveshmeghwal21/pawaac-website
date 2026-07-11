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
// Reticle_Frame around the media block (P4), Reveal_On_Scroll clip-path
// entrance (P5), grayscale geometric drone-silhouette Placeholder_Media
// at 16:9 (P7). Real hero photography/video (OCP-18) stays blocked
// pending site-owner approval — only a monochrome geometric placeholder
// is rendered here (Requirement 5.1, 5.4).
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function HomeHero() {
  return (
    // bg-bg/80 -> bg-transparent: Hero is the first, most prominent
    // section and now shows the (fixed) SkyScenery backdrop completely
    // unobstructed, rather than through a near-opaque dark tint. See
    // SkyScenery.tsx for the corresponding contrast fix that makes the
    // sky itself actually visible.
    <section className="relative overflow-hidden bg-transparent px-6 py-28 md:py-36">
      {/* Display_Type oversized word-mark texture behind hero media
          (Pattern 1), purely decorative — hidden from assistive
          technology per Requirement 10.6 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[20vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        PAWAAC
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Local text backdrop, sized to just this text column (not the
            whole section): with the section now fully transparent, on
            short viewports this text can land over the sky gradient's
            lighter grey-600 horizon band, where text-muted (#8a8a8a)
            contrast gets marginal. A small semi-opaque dark panel behind
            only the label/heading/supporting-sentence keeps them
            comfortably legible while the sky stays unobstructed
            everywhere else in the section (media block below is
            unaffected — it already has its own opaque background). */}
        <Reveal>
          {/* bg-bg/60 -> bg-bg/70: a sky photo has bright and dark bands
              (top vs horizon vs bottom), and with two CTAs now living in
              this panel it needs slightly more consistent contrast behind
              text at every scroll/viewport position than the lighter tint
              provided. Still semi-opaque, not a solid card — the photo
              stays visible through it everywhere else in the section. */}
          <div className="-mx-4 -my-3 inline-block rounded-lg bg-bg/70 px-4 py-3 backdrop-blur-sm md:-mx-6 md:-my-4 md:px-6 md:py-4">
            <p className="label">Defense &amp; police</p>
            <h1 className="mt-3 max-w-2xl text-heading font-display text-fg">
              Autonomous perimeter response, built in India
            </h1>
            <p className="mt-4 max-w-md text-body font-body text-muted">
              Pawaac drones patrol, detect, and respond without a pilot on
              every flight.
            </p>

            {/* Founder feedback (live UX review): a sky photo with no
                action for the visitor doesn't communicate what Pawaac
                does or what to do next. Two real CTAs, styled from the
                site's existing button conventions rather than a new
                pattern:
                - Primary: HomeContactBand.tsx's filled Request-a-demo
                  treatment (bg-fg/text-bg, hover:bg-interactive),
                  resized to match the secondary button's compact
                  px-4 py-2 / text-[11px] footprint instead of that
                  section's standalone px-10 py-4 / text-sm scale.
                - Secondary: Navigation.tsx's exact outline "Request
                  Demo" treatment (border-fg, hover:bg-fg hover:text-bg),
                  unchanged. */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-block bg-fg px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-bg transition-colors hover:bg-interactive"
              >
                Request a demo
              </a>
              <a
                href="/product"
                className="inline-block border border-fg px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg"
              >
                Explore the platform
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div
            className="relative mx-auto w-full max-w-4xl grayscale"
            style={{
              aspectRatio: "16 / 9",
              background: "radial-gradient(circle at 60% 40%, #181818, #080808)",
            }}
          >
            {/* Placeholder_Media: geometric angular drone-silhouette
                line-art, 16:9 aspect-boxed, monochrome only
                (Requirement 5.1, 5.4). Purely decorative — no simulated
                telemetry or live-style readout. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 320 180"
              className="absolute inset-0 h-full w-full p-14 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="30" y1="90" x2="290" y2="90" />
              <line x1="160" y1="40" x2="160" y2="140" />
              <circle cx="30" cy="90" r="16" />
              <circle cx="290" cy="90" r="16" />
              <circle cx="160" cy="40" r="16" />
              <circle cx="160" cy="140" r="16" />
              <rect x="130" y="70" width="60" height="40" />
            </svg>
            <ReticleFrame variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
