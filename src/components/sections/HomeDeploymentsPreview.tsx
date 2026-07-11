"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 3)
// Requirements: 4.1, 4.3, 5.1, 5.4, 6.1, 6.3
// Design: design.md -> Page Specifications -> Homepage, Section 3
//         (Deployment sectors preview)
//
// Persona: Defense_Police_Persona. Grayscale sector thumbnails (P7) with
// Label_Caps sector tags (P2), Reveal_On_Scroll entrance (P5). OCP-03
// (thumbnail treatment: abstract icons vs. generalized photography) stays
// open — per the gating note, this section uses ABSTRACT ICON placeholders
// only, never real or generalized facility imagery (Requirement 5.1, 5.4,
// 8.1). Resolved via site-owner-delegated judgment: an abstract line-art
// icon is now rendered for every sector tag (defense, police, industrial,
// infrastructure) so the section reads as a finished icon set rather than
// two bare placeholder tiles; no real facility imagery was introduced.
//
// Task 65 update: Deployments_Page (/deployments) has been removed
// entirely. Per task 65's decision point, this section keeps its default
// option (c) treatment — a purely illustrative teaser with no outbound
// link. The "View all deployments" CTA that previously linked to
// /deployments has been removed; headline, supporting sentence, and
// visual treatment are otherwise unchanged.
import Reveal from "@/components/ui/Reveal";

const SECTORS = [
  {
    tag: "defense",
    icon: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 80 L35 30 L65 50 L90 20" strokeDasharray="5 4" />
        <circle cx="10" cy="80" r="4" />
        <circle cx="35" cy="30" r="4" />
        <circle cx="65" cy="50" r="4" />
        <circle cx="90" cy="20" r="4" />
      </svg>
    ),
  },
  {
    tag: "police",
    icon: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="36" />
      </svg>
    ),
  },
  {
    tag: "industrial",
    icon: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="15" y="55" width="18" height="30" />
        <rect x="41" y="35" width="18" height="50" />
        <rect x="67" y="45" width="18" height="40" />
        <path d="M20 55 L20 40 L28 40 L28 55" />
      </svg>
    ),
  },
  {
    tag: "infrastructure",
    icon: (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 75 L50 25 L90 75" />
        <line x1="30" y1="75" x2="30" y2="52" />
        <line x1="50" y1="75" x2="50" y2="38" />
        <line x1="70" y1="75" x2="70" y2="52" />
        <line x1="10" y1="75" x2="90" y2="75" />
      </svg>
    ),
  },
];

export default function HomeDeploymentsPreview() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through.
    <section className="relative overflow-hidden bg-bg/50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="label">Defense &amp; police</p>
          <h2 className="mt-3 text-heading font-display text-fg">
            Where Pawaac operates today
          </h2>
          <p className="mt-4 text-body font-body text-muted">
            Borders, facilities, and critical sites across defense, police,
            and industrial deployments.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.1}>
              <div
                aria-hidden="true"
                className="relative w-full grayscale"
                style={{
                  aspectRatio: "16 / 9",
                  background: "radial-gradient(circle, #181818, #080808)",
                }}
              >
                <div className="absolute inset-0 p-10 text-fg/50">{s.icon}</div>
                <span className="label absolute left-4 top-4 text-muted">{s.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
