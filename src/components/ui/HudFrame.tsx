export default function HudFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] hidden mix-blend-difference md:block"
    >
      {/* corner brackets */}
      <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-white/50" />
      <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-white/50" />
      <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/50" />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/50" />

      {/* left system spine */}
      <span
        className="absolute left-[18px] top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.35em] text-white/40"
        style={{ writingMode: "vertical-rl" }}
      >
        PAWAAC // AERIAL AUTONOMY SYSTEMS
      </span>

      {/* coordinate / status readout */}
      <span className="absolute bottom-4 right-10 font-mono text-[9px] tracking-widest text-white/40">
        12.97°N 77.59°E // SYS NOMINAL
      </span>
    </div>
  );
}
