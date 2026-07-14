import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page route)
// Requirements: 1.1, 4.1, 4.3, 4.4, 5.1, 5.4, 9.6, 9.7
// Design: design.md -> Page Specifications -> Product_Page
//
// Establishes the new `/product` route. Content is composed from four
// section components (Hero/hardware overview, Specifications, Sensor &
// payload detail, Dock & charging) migrated from
// `src/components/sections/DroneShowcase.tsx`, restructured to match the
// Product_Page section table in design.md rather than re-rendering
// DroneShowcase unstyled.
import ProductHero from "@/components/sections/ProductHero";
import ProductSpecifications from "@/components/sections/ProductSpecifications";
import ProductSensorPayload from "@/components/sections/ProductSensorPayload";
import ProductDockCharging from "@/components/sections/ProductDockCharging";

export const metadata: Metadata = {
  title: "Product · PAWAAC Drones",
  description:
    "The Pawaac autonomous drone platform: purpose-built airframe, sensor payload, and dock, engineered together.",
};

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <ProductSpecifications />
      <ProductSensorPayload />
      <ProductDockCharging />
    </>
  );
}
