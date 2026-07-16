// Spec: pawaac-design-language-evolution — Task 70 (Homepage Section 7, supersedes Task 16)
// Requirements: 4.4
// Design: design.md -> Page Specifications -> Homepage, Section 7
//         (Company / trust strip) — partially resolved OCP-05
//
// Persona: Both. Technical_Data metadata row (P2), linking to
// Company_Page (/company, task 13). OCP-05 is now PARTIALLY resolved: the
// founding year (2025) is approved for public display and is added below
// as the third item in the existing metadata row. Team size and HQ
// location remain open/undisclosed (narrowed OCP-05 — see task 44) and are
// intentionally NOT added here.
//
// Entrance motion: this was the only Homepage section with no scroll
// entrance at all, breaking the page's motion rhythm right before the
// closing HomeContactBand. Wrapped in Reveal_On_Scroll (same shared
// component/fallback every other section already uses) rather than a new
// pattern — the metadata row gets a slight extra delay so it settles in
// just after the heading/CTA row above it.
"use client";

import Reveal from "@/components/ui/Reveal";

export default function HomeCompanyStrip() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through.
    <section className="relative bg-bg/50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-[2fr_1fr] md:items-end">
            <div>
              <p className="label">Company</p>
              <h2 className="mt-3 text-heading font-display text-fg">
                Built by Bajrang Dronetech Pvt Ltd
              </h2>
              <p className="mt-4 max-w-md text-body font-body text-muted">
                Engineering and operations based in India, purpose-built for
                the field.
              </p>
            </div>

            <div className="md:text-right">
              <a
                href="/company"
                className="inline-block border border-fg px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg"
              >
                About the company
              </a>
            </div>
          </div>
        </Reveal>

        {/* Technical_Data metadata row — founding year (2025) added as the
            third item per the resolved, narrowed OCP-05 (Requirement 4.4).
            Team size and HQ location remain gated/undisclosed (task 44). */}
        <Reveal delay={0.1}>
          <div className="technical-data mt-8 flex flex-wrap gap-x-10 gap-y-2 text-muted">
            <span>Bajrang Dronetech Pvt Ltd</span>
            <span>Engineering &amp; operations · India</span>
            <span>Founded 2025</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
