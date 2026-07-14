import { describe, expect, it } from "vitest";
import { dims, siteBounds } from "./SystemDesigner";

// Spec: pawaac-design-language-evolution — Task 38.1 (Verify page-split
// migration and cross-page integration: Planner_Page coverage math)
// Requirements: 9.3
// Design: design.md -> Page Specifications -> Planner_Page
//
// `siteBounds` and `dims` were extracted as named exports from
// SystemDesigner.tsx as a pure refactor (no logic change) so the
// dock-tiling/coverage-area math that feeds `areaKm2` and the dock-grid
// generation in SystemDesigner's `useEffect` can be unit-tested directly,
// without needing to render the full SystemDesigner/MapCanvas tree (which
// depends on Leaflet/browser APIs like `navigator.geolocation` and DOM
// tile rendering).

describe("siteBounds (Requirement 9.3)", () => {
  it("returns a bounds box centered on the given lat/lng", () => {
    const b = siteBounds(12.9716, 77.5946);
    const midLat = (b.sw[0] + b.ne[0]) / 2;
    const midLng = (b.sw[1] + b.ne[1]) / 2;
    expect(midLat).toBeCloseTo(12.9716, 6);
    expect(midLng).toBeCloseTo(77.5946, 6);
    expect(b.ne[0]).toBeGreaterThan(b.sw[0]);
    expect(b.ne[1]).toBeGreaterThan(b.sw[1]);
  });
});

describe("dims (Requirement 9.3)", () => {
  it("computes a roughly square ~400m x 400m box for siteBounds' default span", () => {
    const b = siteBounds(12.9716, 77.5946);
    const { widthM, heightM } = dims(b);

    // siteBounds uses a fixed 0.0018 degree half-height, which at Earth's
    // radius resolves to roughly 400m tall; width is longitude-corrected by
    // cos(lat) to stay approximately square near the equator-to-mid
    // latitudes range PAWAAC's deployments target.
    expect(heightM).toBeGreaterThan(380);
    expect(heightM).toBeLessThan(420);
    expect(widthM).toBeGreaterThan(380);
    expect(widthM).toBeLessThan(420);
  });

  it("produces a larger area for a bounds box with wider lat/lng spread", () => {
    const small = siteBounds(12.9716, 77.5946);
    const large = {
      sw: [small.sw[0] * 2, small.sw[1] * 2] as [number, number],
      ne: [small.ne[0] * 2, small.ne[1] * 2] as [number, number],
    };
    const smallDims = dims(small);
    const largeDims = dims(large);
    const smallArea = smallDims.widthM * smallDims.heightM;
    const largeArea = largeDims.widthM * largeDims.heightM;
    expect(largeArea).toBeGreaterThan(smallArea);
  });
});
