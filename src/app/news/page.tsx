import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 59 (News_Page route),
// updated for News_Page real content (resolves OCP-19)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> News_Page
//
// The `/news` route (linked from Navigation's Resources dropdown, task 57)
// now renders a real news listing — OCP-19 is RESOLVED; see NewsHero.tsx /
// NewsList.tsx for the real, founder-approved news item.
import NewsHero from "@/components/sections/NewsHero";

export const metadata: Metadata = {
  title: "News · PAWAAC Drones",
  description: "Company and product news, as it happens.",
};

export default function NewsPage() {
  return <NewsHero />;
}
