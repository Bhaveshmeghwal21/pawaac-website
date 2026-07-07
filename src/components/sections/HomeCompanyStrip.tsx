// Spec: pawaac-design-language-evolution — Task 16 (Homepage Section 7)
// Requirements: 4.1, 4.3, 6.1, 6.3, 6.4
// Design: design.md -> Page Specifications -> Homepage, Section 7
//         (Company / trust strip)
//
// Persona: Both. Technical_Data metadata row (P2), linking to
// Company_Page (/company, task 13). OCP-05 (which company facts —
// founding year, team size, location — are approved for public display)
// stays open: this section renders ONLY the fixed headline and the fixed
// supporting sentence from design.md's table, with no additional fact
// (no founding year, no team size, no numeral) appended.
export default function HomeCompanyStrip() {
  return (
    // bg-bg/80 -> bg-bg/50: SkyScenery's contrast fix (see SkyScenery.tsx)
    // now makes the sky genuinely visible, so this section's tint is
    // loosened further to let more of it show through.
    <section className="relative bg-bg/50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
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

        {/* Technical_Data metadata row — no additional fact (founding
            year, team size, etc.) is populated here; that remains gated by
            OCP-05 (Requirement 7.2, Phase 4, task 44). */}
        <div className="technical-data mt-8 flex flex-wrap gap-x-10 gap-y-2 text-muted">
          <span>Bajrang Dronetech Pvt Ltd</span>
          <span>Engineering &amp; operations · India</span>
        </div>
      </div>
    </section>
  );
}
