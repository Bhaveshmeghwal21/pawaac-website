"use client";

// Spec: pawaac-design-language-evolution — Task 13 (Company_Page Section 3)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Company_Page, Section 3
//         (Team / careers teaser)
//
// Persona: Both. Grayscale/geometric Placeholder_Media (P7) — real team
// photography (OCP-16) stays blocked pending site-owner approval. Links to
// Careers_Page (`/careers`); that route is created by task 15 and does not
// exist yet as of this task — Next.js does not validate link targets at
// build time, so this link is safe to add now and will resolve once task
// 15 lands. A plain `<a href="/careers">` is used here for consistency
// with every other internal link in this codebase (Navigation.tsx,
// Footer.tsx, and the other page-section components all use plain `<a>`
// rather than `next/link`).
import Reveal from "@/components/ui/Reveal";

export default function CompanyTeam() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Careers</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            Join the team
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            We&apos;re hiring across hardware, autonomy, and field operations.
          </p>
          <a
            href="/careers"
            className="mt-6 inline-block border border-fg px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg"
          >
            View open roles
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm grayscale"
            style={{
              aspectRatio: "16 / 9",
              background: "radial-gradient(circle, #181818, #080808)",
            }}
          >
            {/* Placeholder_Media: abstract geometric placeholder (no real
                team photography exists yet, pending OCP-16), 16:9
                aspect-boxed, monochrome only (Requirement 5.1, 5.4). */}
            <svg
              viewBox="0 0 220 124"
              className="absolute inset-0 h-full w-full p-8 text-fg/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="70" cy="62" r="18" />
              <circle cx="110" cy="50" r="18" />
              <circle cx="150" cy="62" r="18" />
              <line x1="70" y1="80" x2="70" y2="104" />
              <line x1="110" y1="68" x2="110" y2="104" />
              <line x1="150" y1="80" x2="150" y2="104" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
