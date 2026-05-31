"use client";

import "leaflet/dist/leaflet.css";
import L, { type LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Rectangle,
  TileLayer,
  useMap,
} from "react-leaflet";

export type Dock = { id: number; lat: number; lng: number };
export type Bounds = { sw: [number, number]; ne: [number, number] };

const handle = L.divIcon({
  className: "",
  html: '<span style="display:block;width:14px;height:14px;background:#e8202a;border:2px solid #f0ede8;box-shadow:0 0 0 2px #080808"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const dockIcon = L.divIcon({
  className: "",
  html: '<span style="display:block;width:12px;height:12px;border-radius:9999px;background:#e8202a;border:2px solid #ffffff;box-shadow:0 0 0 1.5px #080808"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

function FitOnce({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.fitBounds(bounds, { padding: [90, 90] });
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function MapCanvas({
  bounds,
  docks,
  radiusM,
  onChange,
  onDockMove,
}: {
  bounds: Bounds;
  docks: Dock[];
  radiusM: number;
  onChange: (b: Bounds) => void;
  onDockMove: (id: number, lat: number, lng: number) => void;
}) {
  const { sw, ne } = bounds;
  const center: [number, number] = [(sw[0] + ne[0]) / 2, (sw[1] + ne[1]) / 2];
  const rect: LatLngBoundsExpression = [sw, ne];

  return (
    <MapContainer center={center} zoom={12} zoomControl={false} className="map-dark h-full w-full bg-bg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        subdomains="abc"
      />

      <FitOnce bounds={rect} />

      {docks.map((d) => (
        <Circle
          key={`c${d.id}`}
          center={[d.lat, d.lng]}
          radius={radiusM}
          pathOptions={{ color: "#e8202a", weight: 1, fillColor: "#e8202a", fillOpacity: 0.06 }}
        />
      ))}

      <Rectangle
        bounds={rect}
        pathOptions={{
          color: "#f0ede8",
          weight: 1.5,
          dashArray: "6 6",
          fillColor: "#f0ede8",
          fillOpacity: 0.04,
        }}
      />

      {docks.map((d) => (
        <Marker
          key={`d${d.id}`}
          draggable
          position={[d.lat, d.lng]}
          icon={dockIcon}
          eventHandlers={{
            drag: (e) => {
              const p = e.target.getLatLng();
              onDockMove(d.id, p.lat, p.lng);
            },
          }}
        />
      ))}

      {/* move handle */}
      <Marker
        draggable
        position={center}
        icon={handle}
        eventHandlers={{
          drag: (e) => {
            const c = e.target.getLatLng();
            const hLat = (ne[0] - sw[0]) / 2;
            const hLng = (ne[1] - sw[1]) / 2;
            onChange({ sw: [c.lat - hLat, c.lng - hLng], ne: [c.lat + hLat, c.lng + hLng] });
          },
        }}
      />

      {/* resize handle (north-east corner) */}
      <Marker
        draggable
        position={ne}
        icon={handle}
        eventHandlers={{
          drag: (e) => {
            const p = e.target.getLatLng();
            onChange({ sw, ne: [Math.max(p.lat, sw[0] + 0.003), Math.max(p.lng, sw[1] + 0.003)] });
          },
        }}
      />
    </MapContainer>
  );
}
