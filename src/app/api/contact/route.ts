import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Demo request received. Wire an email provider (e.g. Resend) here using
  // process.env.RESEND_API_KEY to forward parsed.data to kshitij@pawaac.com.
  console.log("[contact] demo request:", parsed.data);

  return NextResponse.json({ ok: true });
}
