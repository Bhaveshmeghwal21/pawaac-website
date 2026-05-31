"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import Reveal from "@/components/ui/Reveal";

const FIELDS: { name: keyof ContactInput; label: string; type?: string; req?: boolean }[] = [
  { name: "name", label: "Name", req: true },
  { name: "organization", label: "Organization", req: true },
  { name: "role", label: "Role (Commander / Security Head…)" },
  { name: "email", label: "Email", type: "email", req: true },
  { name: "phone", label: "Phone", type: "tel" },
];

export default function Contact() {
  const { register, handleSubmit, setError, formState } = useForm<ContactInput>();
  const { errors, isSubmitting } = formState;
  const [done, setDone] = useState(false);

  const onSubmit = async (data: ContactInput) => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (v?.[0]) setError(k as keyof ContactInput, { message: v[0] });
      }
      return;
    }
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (res.ok) setDone(true);
    else setError("root", { message: "Something went wrong. Try again." });
  };

  const inputCls =
    "w-full border border-line bg-surface px-3 py-2.5 text-sm text-fg outline-none transition focus:border-red placeholder:text-muted";

  return (
    <section id="contact" className="bg-bg-2 px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[2fr_3fr]">
        <Reveal>
          <p className="label text-red">Get in Touch</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-fg md:text-5xl">
            Schedule a live demonstration.
          </h2>
          <p className="mt-4 text-muted">
            See PAWAAC deployed in a mission scenario. Available for defense
            units, police departments, and government agencies.
          </p>
          <div className="mt-8 space-y-2 font-mono text-[13px] text-muted">
            <p>✉ kshitij@pawaac.com</p>
            <p>☎ +91 76739 43461</p>
            <p>⌖ Jayanagar, Bengaluru 560011</p>
          </div>
        </Reveal>

        <Reveal y={40}>
          {done ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center border border-green/40 bg-surface p-8 text-center">
              <span className="text-3xl text-green">✓</span>
              <p className="mt-3 text-fg">
                Request received. We&apos;ll contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <input
                    {...register(f.name)}
                    type={f.type ?? "text"}
                    placeholder={`${f.label}${f.req ? " *" : ""}`}
                    className={inputCls}
                  />
                  {errors[f.name] && (
                    <p className="mt-1 font-mono text-[11px] text-red">
                      {errors[f.name]?.message}
                    </p>
                  )}
                </div>
              ))}
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell us about your use case"
                className={inputCls}
              />
              {errors.root && (
                <p className="font-mono text-[11px] text-red">{errors.root.message}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Request Live Demo →"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
