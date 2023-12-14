import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import { z } from "zod";
import { randomBytes } from "crypto";
import { resend } from "#/lib/email";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const rawJSON = await req.json();
  const schema = z.object({
    email: z.string().email().trim(),
    code: z.string().trim(),
  });
  const { email, code } = schema.parse(rawJSON);
  const key = await kv.get<string | undefined>(`otp:${email}`);
  if (!key) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const isValid = authenticator.verify({ token: code, secret: key });
  if (!isValid) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await resend.emails.send({
    from: "Trillium Partners <otp@trillium.elijahcobb.app>",
    to: email,
    subject: "New Sign In",
    text: "You have signed in to your Trillium Partners account.",
  });
  return NextResponse.json({ ok: true });
};
