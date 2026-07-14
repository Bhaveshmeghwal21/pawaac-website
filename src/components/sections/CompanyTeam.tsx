"use client";

// Spec: pawaac-design-language-evolution — Task 13 (Company_Page Section 3)
// Requirements: 1.1, 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Company_Page, Section 3
//         (Team / careers teaser) — OCP-16 resolved via
//         site-owner-delegated judgment
//
// Persona: Both. Links to Careers_Page (`/careers`). A plain
// `<a href="/careers">` is used here for consistency with every other
// internal link in this codebase (Navigation.tsx, Footer.tsx, and the
// other page-section components all use plain `<a>` rather than
// `next/link`).
//
// OCP-16 resolved: wires in the real `public/images/FoundersPhotoNonProfessional.jpeg`
// asset the site owner uploaded specifically for this purpose. Rendered
// with the site's standard grayscale filter + Reticle_Frame convention.
// Captioned honestly and generically ("The founding team") — no specific
// names, titles, or headcount figures are added (per the standing
// team-size no-disclosure rule).
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

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
            className="relative mx-auto w-full max-w-sm"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Real founders photo (resolved OCP-16), grayscale
                resting-state filter per the site's monochrome pattern
                (Requirement 3.1-3.2). Honest, generic caption below — no
                names, titles, or headcount figures. */}
            <Image
              src="/images/FoundersPhotoNonProfessional.jpeg"
              alt="The founding team"
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover grayscale"
            />
            <ReticleFrame variant="dark" />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            The founding team
          </p>
        </Reveal>
      </div>
    </section>
  );
}
