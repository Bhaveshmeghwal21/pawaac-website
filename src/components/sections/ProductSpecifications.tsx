// Spec: pawaac-design-language-evolution — Task 68 (Product_Page Section 2, supersedes Task 10)
// Requirements: 4.1, 4.2
// Design: design.md -> Page Specifications -> Product_Page, Section 2
//         (Specifications)
//
// Persona: Defense_Police_Persona. OCP-07 is now resolved: real,
// brochure-confirmed specifications live on the two dedicated product
// sub-pages (/product/hawkai, /product/sentrivion — tasks 66/67). This
// top-level Section 2 no longer houses a blended-numerals
// Pinned_Spec_Sheet (that usage has been removed entirely); it is now a
// brief lead-in with two clear CTAs linking to both sub-pages, per
// design.md's updated Product_Page table.
export default function ProductSpecifications() {
  return (
    <section className="relative bg-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="label">Product</p>
        <h2 className="mt-3 text-heading font-display text-fg">
          Specifications
        </h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          See the HawkAI Plus and Sentrivion pages for full, confirmed
          hardware specifications.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/product/hawkai"
            className="inline-block border border-fg px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg"
          >
            HawkAI Plus specifications
          </a>
          <a
            href="/product/sentrivion"
            className="inline-block border border-fg px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-fg hover:text-bg"
          >
            Sentrivion specifications
          </a>
        </div>
      </div>
    </section>
  );
}
