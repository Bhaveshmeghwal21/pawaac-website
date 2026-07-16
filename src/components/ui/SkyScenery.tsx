"use client";

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
// tab order (pointer-events-none).
//
// Parallax drift: the photo now drifts slightly slower than page scroll
// (GSAP + ScrollTrigger, already wired up via LenisProvider for Lenis/GSAP
// sync but previously unused anywhere on the homepage) — a small
// translateY scrub tied to document scroll progress, capped well within
// the image's `fill` overscan so no letterboxing/edge gap is ever exposed.
// This is what actually sells cinematic depth for the site's dominant
// full-bleed backdrop; a perfectly static background reads flat by
// comparison to every foreground section animating on top of it.
// Gated behind `prefers-reduced-motion: reduce` (Requirement 9.8): the
// ScrollTrigger is never created under reduced motion, so the layer stays
// completely static, matching every other motion component's fallback.
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SkyScenery() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !imageWrapRef.current) return;
    // Defensive guard matching usePrefersReducedMotion.ts's own fallback:
    // ScrollTrigger's setup probes `window.matchMedia` internally, which
    // jsdom (the test environment) does not implement. Skip creating the
    // ScrollTrigger entirely in any environment where matchMedia is
    // unavailable, rather than letting GSAP throw.
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const el = imageWrapRef.current;

    const tween = gsap.fromTo(
      el,
      { y: -24 },
      {
        y: 24,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion]);

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
          remote-image-domain configuration is required.
          The wrapping div (rather than the Image itself) carries the
          parallax translateY, oversized via inset:-40px so the drift range
          above never exposes an edge gap. */}
      <div ref={imageWrapRef} className="absolute -inset-10">
        <Image
          src="/images/droneInSky.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
        />
      </div>

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
