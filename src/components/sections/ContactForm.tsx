"use client";

// Spec: pawaac-design-language-evolution — Task 14 (Contact_Page Section 2)
// Requirements: 1.1, 1.4, 4.1, 9.1
// Design: design.md -> Page Specifications -> Contact_Page, Section 2
//         (Uplink_Form / contact form); Shared Components -> Uplink_Form
//
// Restyle of the contact form using the Uplink_Form shell (borderless,
// bottom-border-only fields; Technical_Data uppercase labels; focus ring in
// --color-interactive; validation feedback via text/icon/weight change,
// never hue) instead of Contact.tsx's boxed-input styling. The underlying
// react-hook-form + zodResolver(contactSchema) wiring and the POST to
// /api/contact are preserved unchanged from Contact.tsx's pattern — this is
// a restyle plus the one site-owner-approved schema addition (useCase),
// not a logic rewrite. Contact.tsx itself is left untouched (task 16 will
// remove it from the Homepage later).
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import UplinkForm from "@/components/ui/UplinkForm";
import { UplinkInput, UplinkTextarea } from "@/components/ui/UplinkField";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  const [done, setDone] = useState(false);

  const onSubmit = async (data: ContactInput) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setDone(true);
    else setError("root", { message: "Something went wrong. Try again." });
  };

  if (done) {
    return (
      <section className="bg-bg px-6 pb-28">
        <div className="mx-auto flex max-w-3xl min-h-[300px] flex-col items-center justify-center border-t border-line pt-12 text-center">
          <span aria-hidden="true" className="text-3xl text-fg">
            ✓
          </span>
          <p className="mt-3 text-fg">
            Request received. We&apos;ll contact you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg px-6 pb-28">
      <div className="relative mx-auto max-w-3xl">
        <UplinkForm
          onSubmit={handleSubmit(onSubmit)}
          withReticle
          reticleVariant="dark"
          className="p-8 md:p-12"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <UplinkInput
              label="Name"
              required
              error={errors.name?.message}
              {...register("name")}
            />
            <UplinkInput
              label="Organization"
              required
              error={errors.organization?.message}
              {...register("organization")}
            />
            <UplinkInput
              label="Role"
              error={errors.role?.message}
              {...register("role")}
            />
            <UplinkInput
              label="Email"
              type="email"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <UplinkInput
              label="Phone"
              type="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <UplinkInput
              label="Use case"
              required
              error={errors.useCase?.message}
              {...register("useCase")}
            />
          </div>

          <UplinkTextarea
            label="Message"
            required
            rows={4}
            error={errors.message?.message}
            {...register("message")}
          />

          {errors.root && (
            <p role="alert" className="technical-data mt-1.5 font-semibold underline decoration-2">
              <span aria-hidden="true">⚠</span> {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-interactive disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Request Live Demo →"}
          </button>
        </UplinkForm>
      </div>
    </section>
  );
}
