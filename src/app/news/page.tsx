import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 59 (News_Page route)
// Requirements: 4.1, 4.3, 5.1, 5.4
// Design: design.md -> Page Specifications -> News_Page
//
// Establishes the new `/news` route, linked from Navigation's Resources
// dropdown (task 57). This is entirely net-new, structural content — OCP-19
// (real news content) stays open, so no real or fabricated news items are
// published here; see NewsHero.tsx for the honest empty-state listing area.
import NewsHero from "@/components/sections/NewsHero";

export const metadata: Metadata = {
  title: "News · PAWAAC Drones",
  description: "Company and product news, as it happens.",
};

export default function NewsPage() {
  return <NewsHero />;
}
