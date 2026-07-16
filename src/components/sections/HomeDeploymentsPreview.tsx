"use client";

// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 3)
// Requirements: 4.1, 4.3, 5.1, 5.4, 6.1, 6.3
// Design: design.md -> Page Specifications -> Homepage, Section 3
//         (Deployment sectors preview)
//
// Persona: Defense_Police_Persona. Real photography sector thumbnails with
// Label_Caps sector tags (P2), Reveal_On_Scroll entrance (P5).
//
// OCP-03 RESOLVED (site-owner decision, current session): the prior
// abstract-icon-only restriction is explicitly lifted by the site owner.
// Each sector tile shows a real, commercially-licensed photo instead of an
// abstract line-art icon. Defense and police tiles use aerial photography
// specifically per site-owner request (an aerial view fits the
// "sense from above" framing better than a ground-level shot):
//   - defense: "Bangalore cantonment (44254283060).jpg" by Kevin Prince,
//     an aerial view of an Indian Army cantonment area, CC BY-SA 2.0
//     (https://creativecommons.org/licenses/by-sa/2.0/).
//   - police: "Downtown hyderabad drone.png" by Shredpave, a drone aerial
//     view of a major Indian city (Hyderabad), CC0 1.0 Universal Public
//     Domain Dedication (no attribution required) — paired with "police"
//     as a city/urban-patrol framing rather than a specific police
//     facility (no real facility exists to source responsibly).
//   - industrial: "India industry.jpg" by Abhisek Sarda, CC BY 2.0
//     (https://creativecommons.org/licenses/by/2.0/).
//   - infrastructure: "Howrah Bridge view 01.jpg" by Indrajit Das,
//     CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/).
// All four sourced from Wikimedia Commons (upload.wikimedia.org), verified
// license terms permit commercial use; CC BY / CC BY-SA credit given here
// in code comments per license terms (no on-page attribution UI exists in
// this component). None of the four depict any Pawaac-specific facility,
// customer, or deployment location — they are generic, non-identifying
// sector-representative photos only (still compliant with the "no
// customer/partner identity disclosed" constraint that motivated the
// original OCP-03 gating). Grayscale filter applied to match every other
// real photo on the site (Requirement 3.1-3.2).
//
// Task 65 update: Deployments_Page (/deployments) has been removed
// entirely. Per task 65's decision point, this section keeps its default
// option (c) treatment — a purely illustrative teaser with no outbound
// link. The "View all deployments" CTA that previously linked to
// /deployments has been removed; headline, supporting sentence, and
// visual treatment are otherwise unchanged.
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const SECTORS = [
  {
    tag: "defense",
    src: "/images/sector-defense.jpg",
    alt: "Aerial view of an Indian Army cantonment area",
  },
  {
    tag: "police",
    src: "/images/sector-police.jpg",
    alt: "Drone aerial view of a major Indian city",
  },
  {
    tag: "industrial",
    src: "/images/sector-industrial.jpg",
    alt: "Aerial view of an industrial area near Mumbai, India",
  },
  {
    tag: "infrastructure",
    src: "/images/sector-infrastructure.jpg",
    alt: "Howrah Bridge, a major infrastructure landmark in Kolkata, India",
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
            Where Pawaac is built to operate
          </h2>
          <p className="mt-4 text-body font-body text-muted">
            Borders, facilities, and critical sites across defense, police,
            and industrial deployments.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <Reveal key={s.tag} delay={0.05 + i * 0.08}>
              <div
                className="relative w-full grayscale"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="label absolute left-4 top-4 text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                  {s.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
