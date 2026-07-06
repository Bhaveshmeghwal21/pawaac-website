import type { Metadata } from "next";

// User-requested follow-up (Product header dropdown, item 2 of 4):
// "Docking system" — net-new placeholder route. Existing dock-related
// content lives in src/components/sections/ProductDockCharging.tsx
// (rendered on /product); this route gives the docking system its own
// dedicated page, reusing the same placeholder-media conventions.
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Docking System · PAWAAC Drones",
  description:
    "The dock that recharges and redeploys the Pawaac drone automatically, without a human in the loop.",
};

export default function DockingSystemPage() {
  return (
    <section className="relative bg-bg px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="label">Product / Docking System</p>
          <h1 className="mt-3 text-heading font-display text-fg">
            Dock, charge, redeploy — automatically
          </h1>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            The dock recharges and redeploys the drone without a human in the
            loop.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm border border-line"
            style={{ aspectRatio: "4 / 3" }}
          >
            <svg
              viewBox="0 0 200 150"
              className="h-full w-full p-10 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="30" y="90" width="140" height="40" />
              <line x1="100" y1="90" x2="100" y2="40" />
              <circle cx="100" cy="30" r="10" />
              <line x1="70" y1="55" x2="130" y2="55" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
