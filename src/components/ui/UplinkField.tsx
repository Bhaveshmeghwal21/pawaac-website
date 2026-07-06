"use client";

// Spec: pawaac-design-language-evolution — Task 6 (Uplink_Form)
// Requirements: 9.8, 10.4, 3.8
// Design: design.md -> Shared Components -> Uplink_Form
//
// Reusable styled field primitive for the "terminal-styled form" shell:
//   - No bounding box: border: none; border-bottom: 1px solid var(--color-grey-500)
//   - Technical_Data-styled (`.technical-data`) uppercase floating label
//   - Focus state: border-bottom-color: var(--color-interactive) + a visible
//     offset focus ring in var(--color-interactive)
//   - Validation feedback (error/success) communicated via text content +
//     icon glyph + weight/underline-style change — NEVER hue — rendered as
//     an inline `role="alert"` message. Never suppressed by
//     prefers-reduced-motion (it is essential state-change feedback).
//
// This is a styling/shell primitive only. It does NOT implement or modify
// any validation logic — callers pass `error`/`success` state computed by
// their own existing form logic (e.g. react-hook-form + src/lib/schemas.ts,
// unchanged). Wiring this into Contact_Page/Careers_Page happens in a later,
// separate per-page task — this task does not touch Contact.tsx.
import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type SharedProps = {
  label: string;
  error?: string;
  success?: string;
  required?: boolean;
};

const fieldWrapperCls = "relative pt-5";

const baseFieldCls =
  "w-full border-0 border-b bg-transparent px-0 py-2 text-fg outline-none transition-colors " +
  "[border-bottom-color:var(--color-grey-500)] placeholder:text-muted " +
  "focus:[border-bottom-color:var(--color-interactive)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:[outline-color:var(--color-interactive)]";

function FieldMessage({ error, success }: { error?: string; success?: string }) {
  if (!error && !success) return null;
  return (
    <p
      role="alert"
      className={
        error
          ? "technical-data mt-1.5 flex items-center gap-1.5 font-semibold underline decoration-2"
          : "technical-data mt-1.5 flex items-center gap-1.5 font-normal no-underline"
      }
    >
      <span aria-hidden="true">{error ? "⚠" : "✓"}</span>
      {error ?? success}
    </p>
  );
}

export const UplinkInput = forwardRef<
  HTMLInputElement,
  SharedProps & InputHTMLAttributes<HTMLInputElement>
>(function UplinkInput({ label, error, success, required, id, ...rest }, ref) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <div className={fieldWrapperCls}>
      <label
        htmlFor={fieldId}
        className="technical-data absolute left-0 top-0 text-muted"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <input
        {...rest}
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={!!error}
        placeholder={rest.placeholder ?? `${label.toUpperCase()}${required ? " *" : ""}`}
        className={baseFieldCls}
      />
      <FieldMessage error={error} success={success} />
    </div>
  );
});

export const UplinkTextarea = forwardRef<
  HTMLTextAreaElement,
  SharedProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function UplinkTextarea({ label, error, success, required, id, ...rest }, ref) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <div className={fieldWrapperCls}>
      <label
        htmlFor={fieldId}
        className="technical-data absolute left-0 top-0 text-muted"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <textarea
        {...rest}
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={!!error}
        placeholder={rest.placeholder ?? `${label.toUpperCase()}${required ? " *" : ""}`}
        className={baseFieldCls}
      />
      <FieldMessage error={error} success={success} />
    </div>
  );
});
