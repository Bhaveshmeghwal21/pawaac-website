import type { Metadata } from "next";
import SystemDesigner from "@/components/designer/SystemDesigner";

export const metadata: Metadata = {
  title: "Coverage Planner · PAWAAC Drones",
  description:
    "Design your own autonomous surveillance coverage. Draw your property on the map and see the number of drone docking stations needed for 24x7 protection.",
};

export default function DesignerPage() {
  return <SystemDesigner />;
}
