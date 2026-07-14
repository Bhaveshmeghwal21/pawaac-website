"use client";

// Spec: pawaac-design-language-evolution — Commitments_Page restructure
// (resolves OCP-20 alongside VisionHero/VisionPillars/CommitmentsPrinciples)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> Commitments_Page ("Our
//         Vision & Commitments"), Section 2 (Introducing Pawaac)
//
// Persona: Both. Founder-authored copy (verbatim, resolves OCP-20's
// company-introduction framing) — every sentence/claim below is
// reproduced exactly as approved; only paragraph reflow is applied.
// Two-column layout mirroring CompanyMission.tsx/HomeEnterpriseFraming.tsx's
// existing text + supporting-image pattern. The supporting image is the
// real, previously-unused `public/images/sentrivion-product-3.jpg`,
// grayscale filter + `Reticle_Frame` (P4), since this section introduces
// both HawkAI Plus and Sentrivion.
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

export default function VisionIntro() {
  return (
    <section className="relative bg-white px-6 py-28 text-[#080808]">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[3fr_2fr] md:items-center">
        <Reveal>
          <p className="label text-[#6b6b6b]">Company</p>
          <h2 className="mt-3 text-heading font-display text-[#080808]">
            Introducing Pawaac
          </h2>

          <div className="mt-6 max-w-xl space-y-5 text-body font-body text-[#454545]">
            <p>
              Pawaac is the autonomy and hardware platform of Bajrang
              Dronetech Pvt Ltd, founded in 2025 in India. We build
              unmanned aerial systems that don&apos;t just fly where a
              pilot points them — they sense their environment, reason
              about it, and act, so that the people relying on them can
              focus on the decision that actually needs a human: what to
              do with what the drone found.
            </p>
            <p>
              We started with two platforms. HawkAI Plus is a
              long-endurance tactical UAV built for surveillance,
              reconnaissance, and field response — the kind of aircraft
              that needs to stay up for a long shift, cover real distance,
              and keep working in wind and weather that would ground a
              hobbyist drone. Sentrivion is the opposite end of the same
              idea: an ultra-light, rapid-deploy VTOL that a small team can
              have airborne and watching a perimeter in minutes, docked and
              redeployed automatically, day after day, without someone
              standing over it.
            </p>
            <p>
              Different airframes, same philosophy: autonomy should reduce
              the burden on the operator, not add another screen to
              babysit.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto w-full max-w-sm border border-[#d6d6d6]"
            style={{ aspectRatio: "4 / 5" }}
          >
            {/* Real, previously-unused secondary supporting photo,
                grayscale resting-state filter per the site's monochrome
                pattern (Requirement 3.1-3.2). */}
            <Image
              src="/images/sentrivion-product-3.jpg"
              alt="Sentrivion, one of Pawaac's two aircraft platforms"
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover grayscale"
            />
            <ReticleFrame variant="light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
