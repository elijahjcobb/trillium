import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import { z } from "zod";
import { randomBytes } from "crypto";
import { resend } from "#/lib/email";
import { trackServer } from "#/lib/track-server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const rawJSON = await req.json();
  const schema = z.object({
    email: z.string().email().trim(),
  });
  const { email } = schema.parse(rawJSON);
  const key = randomBytes(32).toString("hex");
  const code = authenticator.generate(key);
  kv.set(`otp:${email}`, key);
  await resend.emails.send({
    from: "Trillium Partners <otp@trillium.elijahcobb.app>",
    to: email,
    subject: "OTP Code",
    text: code,
  });
  await trackServer({ key: "user.auth" });
  return NextResponse.json({ ok: true });
};
