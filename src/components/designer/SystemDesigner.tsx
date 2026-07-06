"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { Bounds, Dock } from "@/components/designer/MapCanvas";

const MapCanvas = dynamic(() => import("@/components/designer/MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-bg-2 font-mono text-xs tracking-widest text-muted">
      INITIALIZING MAP
    </div>
  ),
});

const TO_R = Math.PI / 180;
const EARTH = 6371000;

const CORNERS = [
  "left-[-1px] top-[-1px] border-l border-t",
  "right-[-1px] top-[-1px] border-r border-t",
  "left-[-1px] bottom-[-1px] border-l border-b",
  "right-[-1px] bottom-[-1px] border-r border-b",
];

// ~400m square around a point, scaled so it stays square in meters
function siteBounds(lat: number, lng: number): Bounds {
  const dLat = 0.0018;
  const dLng = dLat / Math.max(0.2, Math.cos(lat * TO_R));
  return { sw: [lat - dLat, lng - dLng], ne: [lat + dLat, lng + dLng] };
}

function dims(b: Bounds) {
  const midLat = ((b.sw[0] + b.ne[0]) / 2) * TO_R;
  const widthM = Math.abs((b.ne[1] - b.sw[1]) * TO_R * Math.cos(midLat) * EARTH);
  const heightM = Math.abs((b.ne[0] - b.sw[0]) * TO_R * EARTH);
  return { widthM, heightM };
}

export default function SystemDesigner() {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [radiusM, setRadiusM] = useState(150);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const [docks, setDocks] = useState<Dock[]>([]);

  const areaKm2 = useMemo(() => {
    if (!bounds) return 0;
    const { widthM, heightM } = dims(bounds);
    return (widthM * heightM) / 1e6;
  }, [bounds]);

  // (re)generate a tiled grid of docks whenever the zone or radius changes;
  // each dock owns a 2r x 2r footprint so the coverage circles tile the area
  useEffect(() => {
    if (!bounds) {
      setDocks([]);
      return;
    }
    const { widthM, heightM } = dims(bounds);
    const span = 2 * radiusM;
    const cols = Math.min(15, Math.max(1, Math.ceil(widthM / span)));
    const rows = Math.min(15, Math.max(1, Math.ceil(heightM / span)));
    const out: Dock[] = [];
    let id = 0;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        out.push({
          id: id++,
          lat: bounds.sw[0] + ((r + 0.5) / rows) * (bounds.ne[0] - bounds.sw[0]),
          lng: bounds.sw[1] + ((c + 0.5) / cols) * (bounds.ne[1] - bounds.sw[1]),
        });
    setDocks(out);
  }, [bounds, radiusM]);

  const moveDock = (id: number, lat: number, lng: number) =>
    setDocks((ds) => ds.map((d) => (d.id === id ? { id, lat, lng } : d)));

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported. Enter an address instead.");
      return;
    }
    setStatus("Locating");
    navigator.geolocation.getCurrentPosition(
      (p) => setBounds(siteBounds(p.coords.latitude, p.coords.longitude)),
      () => setStatus("Location access denied. Enter an address instead.")
    );
  }

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setStatus("Searching");
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
        { headers: { "Accept-Language": "en" } }
      );
      const j = await r.json();
      if (j?.[0]) setBounds(siteBounds(parseFloat(j[0].lat), parseFloat(j[0].lon)));
      else setStatus("Address not found. Try a different search.");
    } catch {
      setStatus("Search failed. Check your connection.");
    }
  }

  // ── Step 1: choose the area ───────────────────────────
  if (!bounds) {
    return (
      <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-bg px-6">
        <div className="relative w-full max-w-md border border-line bg-surface/70 p-8 backdrop-blur-md">
          {CORNERS.map((c) => (
            <span key={c} className={`absolute h-2.5 w-2.5 border-fg/60 ${c}`} />
          ))}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-widest text-fg">[ SYS ]</span>
            <span className="h-px w-8 bg-fg/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Coverage Planner
            </span>
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold text-fg">Choose your site</h1>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
            Allow location access, or enter the address of the property you want to protect.
            Then you will size the survey zone and place docking stations.
          </p>

          <button
            onClick={requestLocation}
            className="mt-6 w-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-interactive"
          >
            Use my current location
          </button>

          <div className="my-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={search} className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter an address or city"
              className="w-full border border-line bg-bg px-3 py-2.5 font-mono text-sm text-fg outline-none transition placeholder:text-muted focus:border-interactive"
            />
            <button
              type="submit"
              className="shrink-0 border border-fg/30 px-4 text-sm font-semibold text-fg transition hover:bg-fg/10"
            >
              Go
            </button>
          </form>

          {status && <p className="mt-3 font-mono text-[11px] text-fg">{status}</p>}
        </div>
      </div>
    );
  }

  // ── Step 2: design the docking system ─────────────────
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0">
        <MapCanvas
          bounds={bounds}
          docks={docks}
          radiusM={radiusM}
          onChange={setBounds}
          onDockMove={moveDock}
        />
      </div>

      <div className="pointer-events-none absolute left-6 top-20 z-[400] flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-widest text-fg">[ SYS ]</span>
        <span className="h-px w-8 bg-fg/40" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Coverage Planner
        </span>
      </div>

      <div className="absolute right-4 top-28 z-[400] w-[300px] max-w-[calc(100vw-2rem)]">
        <div className="relative border border-line bg-surface/85 p-5 backdrop-blur-md">
          {CORNERS.map((c) => (
            <span key={c} className={`absolute h-2.5 w-2.5 border-fg/60 ${c}`} />
          ))}

          <div className="flex items-start justify-between">
            <h1 className="font-display text-xl font-bold text-fg">Design your coverage</h1>
            <button
              onClick={() => {
                setBounds(null);
                setStatus("");
              }}
              className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted transition hover:text-fg"
            >
              Change site
            </button>
          </div>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
            Drag the center marker to move the zone, the corner to resize it, and drag any
            station to reposition it.
          </p>

          <div className="mt-5 flex items-end justify-between border-t border-line pt-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Survey area
            </span>
            <span className="font-mono text-sm text-fg">
              {areaKm2 >= 1 ? areaKm2.toFixed(1) : (areaKm2 * 100).toFixed(1)}
              <span className="ml-1 text-[9px] text-muted">{areaKm2 >= 1 ? "km2" : "ha"}</span>
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
              <span className="text-muted">Patrol radius / dock</span>
              <span className="text-fg">{radiusM} m</span>
            </div>
            <input
              type="range"
              min={50}
              max={400}
              step={25}
              value={radiusM}
              onChange={(e) => setRadiusM(parseInt(e.target.value))}
              className="mt-2 w-full accent-white"
            />
            <p className="mt-2 font-mono text-[9px] leading-relaxed text-muted">
              Longer drone range means each station covers more ground, so fewer stations
              are needed.
            </p>
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Docking stations
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold text-white">{docks.length}</span>
              <span className="font-mono text-[11px] text-muted">suggested</span>
            </div>
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted">
              Each station autonomously charges and swaps drone batteries to sustain 24x7
              coverage within its radius.
            </p>
          </div>

          <a
            href="/#contact"
            className="mt-5 block bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-interactive"
          >
            Request this deployment
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-[400] hidden items-center gap-4 border border-line bg-surface/80 px-4 py-2 font-mono text-[10px] text-muted backdrop-blur-md sm:flex">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white" /> Docking station
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-3 border border-fg/60 bg-fg/10" /> Drone coverage
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-3 border border-dashed border-fg/60" /> Survey zone
        </span>
      </div>
    </div>
  );
}
