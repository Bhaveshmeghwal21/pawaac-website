"use client";

// Spec: pawaac-design-language-evolution — Task 10 (Product_Page Section 3)
// Requirements: 9.6, 9.7
// Design: design.md -> Page Specifications -> Product_Page, Section 3
//         (Sensor & payload detail)
//
// Persona: Both. Preserves the existing 3D drone model viewer
// (`src/components/3d/DroneScene.tsx`) and its mobile/no-WebGL static
// fallback exactly as implemented in `DroneShowcase.tsx` (Requirement
// 9.6-9.7) — this component does NOT alter that logic/behavior, it only
// relocates the viewer into its own section and wraps it in Reticle_Frame
// (Pattern 4), per design.md.
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";
import Reveal from "@/components/ui/Reveal";
import ReticleFrame from "@/components/ui/ReticleFrame";

const DroneScene = dynamic(() => import("@/components/3d/DroneScene"), {
  ssr: false,
});

export default function ProductSensorPayload() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section className="relative bg-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-heading font-display text-fg">Sense every angle</h2>
          <p className="mt-4 max-w-md text-body font-body text-muted">
            Interchangeable payloads adapt the same airframe to the mission.
          </p>
        </Reveal>

        <div
          className="relative mt-10 h-[70vh] w-full overflow-hidden"
          data-cursor="crosshair"
        >
          {/* 3D / fallback — unchanged from DroneShowcase.tsx (Req 9.6, 9.7) */}
          {isMobile ? (
            <div className="flex h-full items-center justify-center">
              <div className="relative h-40 w-72 rounded-sm border border-line bg-[radial-gradient(circle,#181818,#080808)]">
                <div className="absolute left-1/2 top-1/2 h-1.5 w-56 -translate-x-1/2 -translate-y-1/2 rounded bg-fg/20" />
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              </div>
            </div>
          ) : (
            <DroneScene />
          )}
          <ReticleFrame variant="dark" />
        </div>
      </div>
    </section>
  );
}
