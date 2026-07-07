"use client";

// SkyScenery — site-owner-requested full-bleed decorative background
// (live visual-preview feedback, not gated by a Change_Proposal since it
// is pure decoration, no invented facts/numerals).
//
// Purely decorative, monochrome/achromatic abstract sky scene: atmospheric
// gradient bands, a horizon line, a soft "sun/moon" disc, a few blurred
// cloud-like shapes, and faint scan-line banding to keep the restrained
// aerospace/HUD register the rest of the site uses. Built entirely from
// CSS gradients + simple shapes (no photographic image — none exists or is
// approved yet) and ONLY the existing --color-* design tokens (Requirement
// 3.1, 3.2): no blue sky, no hue of any kind.
//
// Requirement 10.6: purely decorative, aria-hidden and excluded from the
// tab order (pointer-events-none). Requirement 9.8: the only motion here
// (a very slow cloud drift) is skipped entirely when
// `prefers-reduced-motion: reduce` is set, via the existing
// usePrefersReducedMotion hook — clouds render fully static in that case.
//
// Rendered once, fixed to the viewport, behind every Homepage section
// (src/app/page.tsx). Individual sections have had their own opaque
// backgrounds loosened to semi-transparent so this layer is actually
// visible scrolling behind them — see page.tsx / Home*.tsx for which
// sections show it through vs. stay solid.
import { motion } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function Cloud({
  className,
  drift,
  duration,
}: {
  className: string;
  drift: number;
  duration: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} />;
  }

  return (
    <motion.div
      className={className}
      initial={{ x: 0 }}
      animate={{ x: [0, drift, 0] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity }}
    />
  );
}

export default function SkyScenery() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Atmospheric gradient bands: --color-black at the top and bottom,
          rising through a genuinely visible charcoal horizon band
          (--color-grey-800 -> --color-grey-600 -> --color-grey-800) around
          ~48-66% viewport height. Reworked from the original near-black
          --color-black -> --color-grey-950 pairing, which was visually
          imperceptible (two near-identical near-black values at 80%
          overlay opacity on top). Strictly achromatic — no hue, no
          --color-interactive. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-black) 0%, var(--color-black) 20%, var(--color-grey-800) 48%, var(--color-grey-600) 58%, var(--color-grey-800) 66%, var(--color-black) 100%)",
        }}
      />

      {/* Soft "sun/moon" disc — bumped from a faint --color-grey-200/400 at
          opacity 0.30 to a near-white --color-grey-100 core fading through
          --color-grey-400, at opacity 0.6, so it reads as a clearly visible
          bright disc against the dark sky rather than a faint smudge. */}
      <div
        className="absolute left-1/2 top-[22%] h-[38vmax] w-[38vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-grey-100) 0%, var(--color-grey-400) 35%, transparent 72%)",
        }}
      />

      {/* Horizon line — bumped from --color-grey-600 at opacity 0.4 to
          --color-grey-400 at opacity 0.6, with a touch more thickness. */}
      <div
        className="absolute inset-x-0 top-[58%] h-[2px] opacity-60"
        style={{ background: "var(--color-grey-400)" }}
      />

      {/* Blurred, soft-edged cloud shapes — bumped from ~0.03-0.05 opacity
          white blobs (nearly invisible) to ~0.12-0.18 so they're actually
          visible against the sky, while keeping the blur for softness.
          Drift is intentionally slow and subtle to stay restrained; skipped
          entirely under prefers-reduced-motion (Requirement 9.8). */}
      <Cloud
        className="absolute left-[8%] top-[16%] h-40 w-72 rounded-full bg-white/15 blur-3xl"
        drift={40}
        duration={38}
      />
      <Cloud
        className="absolute right-[12%] top-[30%] h-32 w-96 rounded-full bg-white/12 blur-3xl"
        drift={-55}
        duration={46}
      />
      <Cloud
        className="absolute left-[35%] top-[10%] h-24 w-64 rounded-full bg-white/[0.18] blur-3xl"
        drift={30}
        duration={52}
      />

      {/* Faint scan-line / gradient banding to keep the restrained
          aerospace/HUD register — thin, very-low-opacity horizontal bands,
          achromatic only. */}
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
