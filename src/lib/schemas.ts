import { z } from "zod";

// Spec: pawaac-design-language-evolution — Task 14 (Contact_Page route)
// Requirements: 9.1
// Design: design.md -> Page Specifications -> Contact_Page
//
// Site-owner-approved schema change (explicitly approved in the task 14
// conversation — NOT gated by Requirement 7.2, distinct from the 16 open
// Change Proposals): `contactSchema` now matches Requirement 9.1's literal
// text exactly — name, organization, use case, and message are all
// required (non-empty), and email is validated against a standard email
// address format. `useCase` is a newly added required field; `message` is
// changed from optional to required. `role` and `phone` are unaffected by
// Requirement 9.1 and remain optional.
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  useCase: z.string().min(1, "Use case is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Spec: pawaac-design-language-evolution — Task 15 (Careers_Page route)
// Requirements: 1.1, 1.3, 4.1, 5.1, 5.4, 9.2
// Design: design.md -> Page Specifications -> Careers_Page, Section 2
//         (Uplink_Form / application form)
//
// Requirement 9.2 (verbatim): "THE Careers_Page SHALL require a resume
// upload, SHALL accept an optional cover letter upload, and SHALL reject,
// with a visible error message, any uploaded file that is not PDF, DOC, or
// DOCX format or that exceeds 8 MB."
//
// `isAllowedApplicationFile` is extracted as a small pure function (rather
// than inlined only in the Zod `superRefine` calls below) so it can be
// unit-tested directly and reused identically on both the client
// (CareersApplicationForm.tsx, via react-hook-form + this schema) and the
// server (src/app/api/careers/route.ts) without duplicating the
// type/size logic in two places.
export const ALLOWED_APPLICATION_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const MAX_APPLICATION_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export type ApplicationFileMeta = { type: string; size: number };

export function isAllowedApplicationFileType(fileType: string): boolean {
  return (ALLOWED_APPLICATION_FILE_TYPES as readonly string[]).includes(fileType);
}

export function isAllowedApplicationFileSize(fileSize: number): boolean {
  return fileSize <= MAX_APPLICATION_FILE_SIZE_BYTES;
}

/**
 * Validates a resume/cover-letter file's type and size against Requirement
 * 9.2. Returns `null` when the file is valid, or a visible, human-readable
 * error message string when it is not. Accepts a plain `{ type, size }`
 * shape (rather than requiring a real `File`/browser `Blob`) so the same
 * function runs identically in the browser (given a `File`) and in the
 * Node.js API route (given a parsed multipart file's metadata).
 */
export function validateApplicationFile(
  file: ApplicationFileMeta,
): string | null {
  if (!isAllowedApplicationFileType(file.type)) {
    return "File must be PDF, DOC, or DOCX format.";
  }
  if (!isAllowedApplicationFileSize(file.size)) {
    return "File must be 8 MB or smaller.";
  }
  return null;
}

// `resume`/`coverLetter` are validated as plain `{ type, size }` metadata
// (see ApplicationFileMeta above) rather than Zod's built-in `File`-instance
// checks, so the identical schema/validator can run in the API route (task
// 15's src/app/api/careers/route.ts), where multipart-parsed files are not
// always `instanceof File` depending on the Next.js runtime, without
// duplicating the type/size rules.
const applicationFileSchema = z
  .custom<ApplicationFileMeta>((val): val is ApplicationFileMeta => {
    return (
      !!val &&
      typeof val === "object" &&
      typeof (val as ApplicationFileMeta).type === "string" &&
      typeof (val as ApplicationFileMeta).size === "number"
    );
  }, "File is required")
  .superRefine((file, ctx) => {
    const message = validateApplicationFile(file);
    if (message) {
      ctx.addIssue({ code: "custom", message });
    }
  });

export const careersSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  resume: applicationFileSchema,
  coverLetter: applicationFileSchema.optional(),
});

export type CareersInput = z.infer<typeof careersSchema>;
