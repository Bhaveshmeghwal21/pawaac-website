import { describe, expect, it } from "vitest";
import {
  contactSchema,
  careersSchema,
  validateApplicationFile,
} from "./schemas";

// Spec: pawaac-design-language-evolution — Task 38.1 (Verify page-split
// migration and cross-page integration: Contact_Page/Careers_Page
// validation)
// Requirements: 9.1, 9.2
// Design: design.md -> Page Specifications -> Contact_Page, Careers_Page
//
// These tests exercise the pure `contactSchema`/`careersSchema` validation
// logic directly (rather than rendering the full ContactForm/
// CareersApplicationForm components), which is sufficient to confirm
// Requirement 9.1/9.2's literal validation rules survived the page-split
// migration (task 14/15) unaffected.

const VALID_CONTACT = {
  name: "Jane Doe",
  organization: "Acme Corp",
  email: "jane@example.com",
  useCase: "Perimeter security for a logistics yard",
  message: "We'd like a demo of the coverage planner.",
};

describe("contactSchema (Requirement 9.1)", () => {
  it("rejects an empty name", () => {
    const result = contactSchema.safeParse({ ...VALID_CONTACT, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty organization", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      organization: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty useCase", () => {
    const result = contactSchema.safeParse({ ...VALID_CONTACT, useCase: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty message", () => {
    const result = contactSchema.safeParse({ ...VALID_CONTACT, message: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email format", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a fully valid payload", () => {
    const result = contactSchema.safeParse(VALID_CONTACT);
    expect(result.success).toBe(true);
  });
});

describe("careersSchema / validateApplicationFile (Requirement 9.2)", () => {
  const validResume = { type: "application/pdf", size: 1024 };

  it("rejects a file with a disallowed MIME type", () => {
    expect(
      validateApplicationFile({ type: "image/png", size: 1024 }),
    ).not.toBeNull();
  });

  it("rejects a file over 8MB", () => {
    expect(
      validateApplicationFile({
        type: "application/pdf",
        size: 8 * 1024 * 1024 + 1,
      }),
    ).not.toBeNull();
  });

  it("accepts a valid PDF-typed small file object", () => {
    expect(validateApplicationFile(validResume)).toBeNull();
  });

  it("requires a resume but treats coverLetter as optional", () => {
    const withoutResume = careersSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
    });
    expect(withoutResume.success).toBe(false);

    const withResumeOnly = careersSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      resume: validResume,
    });
    expect(withResumeOnly.success).toBe(true);
  });
});
