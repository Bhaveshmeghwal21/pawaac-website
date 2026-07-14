"use client";

// Spec: pawaac-design-language-evolution — News_Page real content
// (resolves OCP-19, supersedes NewsHero.tsx's prior "designed empty
// state" listing area)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> News_Page, Section 1
//         (News hero / listing)
//
// Persona: Both. Renders the News_Page listing as a real array of news
// items (currently containing exactly 1 real, founder-approved item) in
// place of NewsHero.tsx's prior "No news yet" designed empty state.
// `Label_Caps` date/category tags (P2), `Technical_Data` metadata row
// (P2), `Reveal_On_Scroll` entrance (P5) per design.md's News_Page table.
//
// This is honest, real content — an announcement of what has actually
// been built and published on the live site (HawkAI Plus, Sentrivion) —
// not fabricated/placeholder copy. OCP-19 is now RESOLVED; see design.md's
// Resolved Change Proposals table.
import Reveal from "@/components/ui/Reveal";

type NewsItem = {
  headline: string;
  date: string;
  category: string;
  body: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    headline: "Pawaac introduces HawkAI Plus and Sentrivion",
    date: "July 11, 2026",
    category: "Company",
    body: "Bajrang Dronetech Pvt Ltd is introducing Pawaac, its autonomy and hardware platform, along with its first two aircraft: HawkAI Plus, a long-endurance tactical UAV, and Sentrivion, an ultra-light, rapid-deploy VTOL. Both platforms share the same onboard autonomy stack and are built for defense, police, and critical-infrastructure field operations. Full specifications for both platforms are available on the Product pages.",
  },
];

export default function NewsList() {
  return (
    <div className="relative z-10 mx-auto mt-16 max-w-3xl">
      <ul className="flex flex-col gap-px border border-line bg-line">
        {NEWS_ITEMS.map((item, i) => (
          <li key={item.headline} className="bg-bg p-8 md:p-10">
            <Reveal delay={0.1 * i}>
              {/* Technical_Data metadata row (P2): date + category, both
                  Label_Caps-styled tags (P2). */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="label">{item.date}</span>
                <span className="technical-data border border-line px-2 py-0.5 text-fg">
                  {item.category}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-display font-bold text-fg md:text-2xl">
                {item.headline}
              </h2>

              <p className="mt-3 max-w-2xl text-body font-body text-muted">
                {item.body}
              </p>

              <a
                href="/product"
                className="group mt-4 inline-flex items-center gap-2 font-mono text-sm text-fg"
              >
                Read more on the Product pages
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
