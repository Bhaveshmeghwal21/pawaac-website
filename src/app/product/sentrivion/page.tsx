import type { Metadata } from "next";

// User-requested follow-up (Product header dropdown, item 3 of 4):
// "Sentrivion" — net-new placeholder route for this named product line.
// No prior content existed for this name anywhere in the codebase; this is
// a fresh page pending real content/specs from the site owner.
export const metadata: Metadata = {
  title: "Sentrivion · PAWAAC Drones",
  description: "Sentrivion — part of the Pawaac product line.",
};

export default function SentrivionPage() {
  return (
    <section className="relative bg-bg px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <p className="label">Product / Sentrivion</p>
        <h1 className="mt-3 text-heading font-display text-fg">Sentrivion</h1>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Details for Sentrivion are being finalized.
        </p>
        <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          Detailed specifications — pending confirmation
        </p>
      </div>
    </section>
  );
}
