"use client";

// Spec: pawaac-design-language-evolution — Task 15 (Careers_Page Section 2)
// Requirements: 1.1, 1.3, 4.1, 5.1, 5.4, 9.2
// Design: design.md -> Page Specifications -> Careers_Page, Section 2
//         (Uplink_Form / application form); Shared Components -> Uplink_Form
//
// Application form built fresh for the new `/careers` route, following the
// same react-hook-form + zodResolver(careersSchema) + Uplink_Form-shell
// pattern established by ContactForm.tsx (task 14). Name/email use
// UplinkInput (./ui/UplinkField); resume/cover-letter use the
// file-input-specific UplinkFileInput variant (added in task 6/15's
// UplinkField.tsx) via react-hook-form's `Controller`, since native file
// inputs are uncontrolled by the browser and `register()` alone would
// surface a `FileList` rather than the single `File` careersSchema
// validates. Client-side rejection of any file that is not PDF/DOC/DOCX or
// exceeds 8 MB, with a visible `role="alert"` error message, is enforced by
// careersSchema (src/lib/schemas.ts) exactly per Requirement 9.2 — this
// component only wires that existing validation into the Uplink_Form shell,
// it does not reimplement the type/size rules.
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { careersSchema, type CareersInput } from "@/lib/schemas";
import UplinkForm from "@/components/ui/UplinkForm";
import { UplinkInput, UplinkFileInput } from "@/components/ui/UplinkField";

const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function CareersApplicationForm() {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CareersInput>({ resolver: zodResolver(careersSchema) });
  const [done, setDone] = useState(false);

  const onSubmit = async (data: CareersInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("resume", data.resume as unknown as File);
    if (data.coverLetter) {
      formData.append("coverLetter", data.coverLetter as unknown as File);
    }

    const res = await fetch("/api/careers", {
      method: "POST",
      body: formData,
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
            Application received. We&apos;ll be in touch.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg px-6 pb-28">
      <div className="relative mx-auto max-w-3xl">
        <p className="label">Careers</p>
        <h2 className="mt-3 text-heading font-display text-fg">Apply</h2>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Upload your resume; a cover letter is optional.
        </p>

        <UplinkForm
          onSubmit={handleSubmit(onSubmit)}
          withReticle
          reticleVariant="dark"
          className="mt-8 p-8 md:p-12"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <UplinkInput
              label="Name"
              required
              error={errors.name?.message}
              {...register("name")}
            />
            <UplinkInput
              label="Email"
              type="email"
              required
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <Controller
            name="resume"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <UplinkFileInput
                label="Resume"
                required
                accept={ACCEPTED_FILE_TYPES}
                error={errors.resume?.message as string | undefined}
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.files?.[0])}
              />
            )}
          />

          <Controller
            name="coverLetter"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <UplinkFileInput
                label="Cover letter"
                accept={ACCEPTED_FILE_TYPES}
                error={errors.coverLetter?.message as string | undefined}
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.files?.[0])}
              />
            )}
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
            {isSubmitting ? "Submitting…" : "Submit Application →"}
          </button>
        </UplinkForm>
      </div>
    </section>
  );
}
