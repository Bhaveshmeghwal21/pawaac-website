import type { Metadata } from "next";

// User-requested follow-up (Product header dropdown, item 4 of 4):
// This product line has now been named "HawkAI" by the site owner —
// replaces the earlier "Quadcopter (name pending)" placeholder. The route
// moved from /product/quadcopter to /product/hawkai to match.
export const metadata: Metadata = {
  title: "HawkAI · PAWAAC Drones",
  description: "The Pawaac HawkAI platform.",
};

export default function HawkAIPage() {
  return (
    <section className="relative bg-bg px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <p className="label">Product / HawkAI</p>
        <h1 className="mt-3 text-heading font-display text-fg">HawkAI</h1>
      </div>
    </section>
  );
}
