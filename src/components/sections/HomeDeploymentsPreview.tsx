"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 3)
// Requirements: 4.1, 4.3, 5.1, 5.4, 6.1, 6.3
// Design: design.md -> Page Specifications -> Homepage, Section 3
//         (Deployment sectors preview)
//
// Persona: Defense_Police_Persona. Grayscale sector thumbnails (P7) with
// Label_Caps sector tags (P2), Reveal_On_Scroll entrance (P5), linking to
// Deployments_Page (/deployments, task 12). OCP-03 (thumbnail treatment:
// abstract icons vs. generalized photography) stays open — per the
// gating note, this section uses ABSTRACT ICON placeholders only, never
// real or generalized facility imagery (Requirement 5.1, 5.4, 8.1).
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
            Borders, facilities, and patrol routes across defense and police
            deployments.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
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

        <Reveal delay={0.2} className="mt-8">
          <a
            href="/deployments"
            className="group inline-flex items-center gap-2 font-mono text-sm text-fg"
          >
            View all deployments
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
