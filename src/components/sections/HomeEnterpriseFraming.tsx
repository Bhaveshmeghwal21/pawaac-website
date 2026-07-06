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
// headline/supporting sentence plus an abstract Placeholder_Media.
import Reveal from "@/components/ui/Reveal";

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
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm border border-[#d6d6d6]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Placeholder_Media: abstract geometric facility placeholder,
                monochrome only (Requirement 5.1, 5.4). No case reference,
                no customer/partner identity (OCP-04 stays open). */}
            <svg
              viewBox="0 0 220 124"
              className="h-full w-full p-8 text-[#8f8f8f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="16" y="20" width="188" height="88" />
              <rect x="40" y="52" width="36" height="36" />
              <rect x="92" y="36" width="26" height="52" />
              <rect x="140" y="60" width="42" height="28" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
