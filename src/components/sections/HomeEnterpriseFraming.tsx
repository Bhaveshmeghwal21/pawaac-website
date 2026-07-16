"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 6)
// Requirements: 4.1, 4.3, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 6
//         (Enterprise & critical-infrastructure framing)
//
// Persona: Enterprise_Persona. Grayscale imagery Placeholder_Media (P7),
// Label_Caps eyebrow (P2). This is the ONLY Enterprise_Persona-only
// section on the Homepage (Property 7 / Requirement 6.1, 6.3): it renders
// after every Defense_Police_Persona section (1-3) in scroll order. OCP-04
// (enterprise case reference) stays open — no case reference is added
// here (Requirement 8.2); this section renders only the fixed
// headline/supporting sentence.
//
// Resolved via site-owner-delegated judgment (no new Change_Proposal
// approval fabricated, OCP-04 itself stays rejected/as-is — no case
// reference is added): the abstract geometric facility placeholder is
// replaced with the real, generic `public/images/rawimage3.jpg`
// (city/traffic scene) — a non-identifying urban/infrastructure image
// that fits this section's industrial/critical-infrastructure persona far
// better than an abstract icon, while disclosing no customer/partner
// identity. Rendered with the site's standard grayscale filter and
// Reticle_Frame treatment (P4/P7), consistent with every other real photo
// on the site.
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function HomeEnterpriseFraming() {
  return (
    // Kept solid `bg-white` (NOT made semi-transparent like the dark
    // sections) despite the site-owner-requested full-bleed SkyScenery
    // backdrop in page.tsx: this is the one light/white section on the
    // Homepage, and letting a dark sky gradient bleed through a
    // semi-transparent white background would either wash out the sky or
    // muddy this section's text contrast (Requirement 3.6-3.8). Solid white
    // here reads as an intentional light "panel" over the dark backdrop.
    <section className="relative overflow-hidden bg-white px-6 py-24 text-[#080808] md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label text-[#6b6b6b]">Enterprise &amp; critical infrastructure</p>
          <h2 className="mt-3 text-heading font-display text-[#080808]">
            Security autonomy for critical sites
          </h2>
          <p className="mt-4 max-w-md text-body font-body text-[#454545]">
            The same platform secures industrial and infrastructure
            perimeters.
          </p>
          <a
            href="/product"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-[#080808]"
          >
            Explore the platform
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <Reveal delay={0.14} y={-20}>
          <div
            className="relative mx-auto w-full max-w-xl border border-[#d6d6d6]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Real, generic (non-identifying) urban/infrastructure scene —
                grayscale resting-state filter matching every other real
                photo on the site (Requirement 3.1-3.2). No case reference,
                no customer/partner identity (OCP-04 stays rejected/as-is).
                Sized up from max-w-sm (384px) to max-w-xl (576px) per
                site-owner request to make this image bigger/more
                prominent. */}
            <Image
              src="/images/rawimage3.jpg"
              alt="Generic urban street and traffic scene representing critical infrastructure"
              fill
              sizes="(min-width: 768px) 576px, 90vw"
              className="object-cover grayscale"
            />
            <ReticleFrame variant="light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
