"use client";

// HeroHeadline — GSAP-driven word-stagger entrance for the homepage hero
// statement.
//
// Distinct from StaggerHeading.tsx (Framer Motion, opacity/y-only word
// reveal used for in-page section headings): this is a hero-grade moment,
// so it uses GSAP directly (already installed and wired up via
// LenisProvider for Lenis sync, but previously unused anywhere on the
// homepage) for finer per-word timeline control — each word blurs into
// focus while rising slightly and settling from a soft scale, rather than
// a flat opacity/clip-path wipe. Runs once on mount (this is the first
// thing a visitor sees; it is not scroll-triggered).
//
// Reduced-motion (Requirement 9.8, same convention as every other motion
// component in this codebase via usePrefersReducedMotion): renders the
// final, fully-visible state immediately, with no GSAP timeline created
// at all.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function HeroHeadline({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const wordEls = containerRef.current.querySelectorAll<HTMLElement>(
      "[data-word]",
    );

    const tween = gsap.fromTo(
      wordEls,
      { opacity: 0, y: 28, scale: 0.96, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      },
    );

    return () => {
      tween.kill();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">{text}</span>
      </h1>
    );
  }

  return (
    <h1 ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            data-word
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {w}
            {i < words.length - 1 && <>&nbsp;</>}
          </span>
        ))}
      </span>
    </h1>
  );
}
