// Spec: pawaac-design-language-evolution — Task 4
// Requirements: 10.6
// Design: design.md -> Shared Components -> Reticle_Frame (crosshair device)
//
// Four independent, absolutely-positioned corner L-shaped 1px-stroke elements
// (20-28px per leg) placed at the four corners of the parent container, using
// --color-grey-800 on dark backgrounds / --color-grey-200 on light
// backgrounds. Purely decorative: aria-hidden, excluded from the tab order,
// and never animates regardless of prefers-reduced-motion (it has no motion
// to begin with).
//
// Usage: render as an absolutely-positioned overlay inside a `position:
// relative` container (e.g. a hero media block or form wrapper):
//   <div className="relative">
//     <img ... />
//     <ReticleFrame variant="dark" />
//   </div>

const LEG = 24; // px per leg, within the 20-28px spec range

export default function ReticleFrame({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const strokeColor =
    variant === "dark" ? "var(--color-grey-800)" : "var(--color-grey-200)";

  const cornerBase = "absolute";
  const legStyle = { borderColor: strokeColor };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none ${className}`}
      style={{ zIndex: 1 }}
    >
      {/* top-left */}
      <span
        className={`${cornerBase} left-0 top-0 border-l border-t`}
        style={{ ...legStyle, width: LEG, height: LEG }}
      />
      {/* top-right */}
      <span
        className={`${cornerBase} right-0 top-0 border-r border-t`}
        style={{ ...legStyle, width: LEG, height: LEG }}
      />
      {/* bottom-left */}
      <span
        className={`${cornerBase} bottom-0 left-0 border-b border-l`}
        style={{ ...legStyle, width: LEG, height: LEG }}
      />
      {/* bottom-right */}
      <span
        className={`${cornerBase} bottom-0 right-0 border-b border-r`}
        style={{ ...legStyle, width: LEG, height: LEG }}
      />
    </div>
  );
}
