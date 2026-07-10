// SkyScenery — site-owner-requested full-bleed decorative background
// (live visual-preview feedback, not gated by a Change_Proposal since it
// is pure decoration, no invented facts/numerals).
//
// Previously a purely CSS-built abstract sky (gradient bands, a soft
// "sun/moon" disc, blurred cloud blobs, scan-line texture). The site owner
// has now supplied a real sky photo and explicitly asked to "paste normal
// sky photo with perfect quality" now, in color, with the site owner
// manually converting it to black-and-white themselves later by swapping
// the file at public/images/skyimage2.jpg.
//
// TEMPORARY, SITE-OWNER-APPROVED EXCEPTION to Requirement 3.1-3.2 (strict
// achromatic/R=G=B palette): this is the one deliberate place in the site
// that intentionally renders a real, non-monochrome color photograph, and
// it is NOT desaturated/grayscale-filtered here on purpose — the owner
// wants "perfect quality" now and will replace this file with a
// black-and-white version manually on their end. Do NOT treat this as a
// compliance regression, and do NOT copy this real-photo-in-color
// treatment to any other component; every other photographic image in the
// site (SentrivionHero, HawkAIHero, etc.) keeps its `grayscale` filter.
//
// Requirement 10.6: purely decorative, aria-hidden and excluded from the
// tab order (pointer-events-none). The cloud-drift motion that previously
// existed here (and its prefers-reduced-motion handling, Requirement 9.8)
// has been removed along with the CSS cloud blobs — a real photo doesn't
// need fake CSS clouds layered on top of it, so there is no motion left to
// gate behind `prefers-reduced-motion` in this component.
//
// Rendered once, fixed to the viewport, behind every Homepage section
// (src/app/page.tsx). Individual sections have had their own opaque
// backgrounds loosened to semi-transparent so this layer is actually
// visible scrolling behind them — see page.tsx / Home*.tsx for which
// sections show it through vs. stay solid.
import Image from "next/image";

export default function SkyScenery() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Real sky photo, full-bleed. This is the Homepage's LCP element
          (rendered above/behind all Homepage sections on first paint), so
          `priority` is set to preload it and skip lazy-loading. `fill` +
          `sizes="100vw"` covers the full viewport at every breakpoint;
          `object-cover` crops to fill without distortion; `object-position`
          is biased slightly above center so the horizon/sky band (rather
          than foreground ground) reads well across common viewport
          aspect ratios. Local /public path — no next.config.ts
          remote-image-domain configuration is required. */}
      <Image
        src="/images/skyimage2.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
        style={{ objectPosition: "center 35%" }}
      />

      {/* Faint scan-line overlay kept as a subtle HUD texture on top of the
          real photo — thin, very-low-opacity horizontal bands, achromatic
          only (Requirement 3.1-3.2 applies here; this overlay is not part
          of the site-owner's color-photo exception). */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-white) 0px, var(--color-white) 1px, transparent 1px, transparent 4px)",
        }}
      />
    </div>
  );
}
