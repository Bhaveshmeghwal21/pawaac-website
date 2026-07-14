import type { Metadata } from "next";

// User-requested follow-up (Product header dropdown, item 1 of 4):
// "Software Stack or how ever u wanna phrase it" — net-new placeholder
// route for the Pawaac software/autonomy stack product line. Styled
// consistently with the other Product_Page-family routes (label / heading /
// supporting sentence pattern used across src/app/product, /autonomy,
// /company, etc.) pending real content from the site owner.
export const metadata: Metadata = {
  title: "Software Stack · PAWAAC Drones",
  description:
    "The software layer that plans missions, fuses sensor data, and drives autonomous decisions across the Pawaac fleet.",
};

export default function SoftwareStackPage() {
  return (
    <section className="relative bg-bg px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <p className="label">Product / Software Stack</p>
        <h1 className="mt-3 text-heading font-display text-fg">
          The software stack
        </h1>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Mission planning, sensor fusion, and decision-making, unified in one
          autonomy stack that runs onboard and at the edge.
        </p>
        <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          Detailed specifications — pending confirmation
        </p>
      </div>
    </section>
  );
}
