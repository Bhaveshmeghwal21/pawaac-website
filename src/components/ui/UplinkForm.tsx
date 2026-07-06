// Spec: pawaac-design-language-evolution — Task 6 (Uplink_Form)
// Requirements: 9.8, 10.4, 3.8
// Design: design.md -> Shared Components -> Uplink_Form
//
// Terminal-styled form shell container. This wraps a `<form>` (or any
// element) with the Uplink_Form visual shell — no bounding chrome of its
// own beyond spacing, so callers' fields (UplinkInput / UplinkTextarea from
// ./UplinkField) and existing submit-button/status markup compose inside
// it unchanged. Optionally wrapped by ReticleFrame for the outer container
// per design.md, via the `withReticle` prop.
//
// This shell does not implement or alter validation logic: it only
// provides the reusable styled primitives. Wiring into Contact_Page or
// Careers_Page (including react-hook-form + src/lib/schemas.ts) is a
// separate, later per-page task.
import type { ReactNode } from "react";
import ReticleFrame from "./ReticleFrame";

export default function UplinkForm({
  children,
  className = "",
  withReticle = false,
  reticleVariant = "dark",
  ...formProps
}: {
  children: ReactNode;
  className?: string;
  withReticle?: boolean;
  reticleVariant?: "dark" | "light";
} & React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <div className="relative">
      {withReticle && <ReticleFrame variant={reticleVariant} />}
      <form {...formProps} className={`space-y-2 ${className}`}>
        {children}
      </form>
    </div>
  );
}
