import { NextRequest, NextResponse } from "next/server";
import { careersSchema } from "@/lib/schemas";

// Spec: pawaac-design-language-evolution — Task 15 (Careers_Page route)
// Requirements: 9.2
// Design: design.md -> Page Specifications -> Careers_Page, Section 2
//         (Uplink_Form / application form)
//
// Modeled directly on src/app/api/contact/route.ts's parse/validate/respond
// pattern: parses the multipart form data, re-validates file type/size
// server-side (never trusting client-side validation alone), and responds
// `{ ok: false, errors }` or `{ ok: true }`. Reuses `careersSchema` (rather
// than duplicating the file type/size rules here) — a browser `File`
// instance structurally satisfies the same `{ type: string, size: number }`
// shape the schema's `applicationFileSchema` checks, so the identical
// schema/validator runs unchanged on both the client and this route. No
// real file persistence is implemented — logging the accepted submission's
// metadata is sufficient for this task.
export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);

  if (!formData) {
    return NextResponse.json(
      { ok: false, errors: { root: ["Invalid form data"] } },
      { status: 400 },
    );
  }

  const coverLetter = formData.get("coverLetter");

  const parsed = careersSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    resume: formData.get("resume"),
    coverLetter:
      coverLetter instanceof File && coverLetter.size > 0
        ? coverLetter
        : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Demo application received. Wire real resume storage (e.g. S3/Resend
  // attachment forwarding) here using parsed.data; no persistence is
  // implemented in this task.
  console.log("[careers] application received:", {
    name: parsed.data.name,
    email: parsed.data.email,
    resumeType: parsed.data.resume.type,
    resumeSize: parsed.data.resume.size,
    hasCoverLetter: !!parsed.data.coverLetter,
  });

  return NextResponse.json({ ok: true });
}
