import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "#/lib/email";
import { trackServer } from "#/lib/track-server";
import { createEndpoint, totpCreate } from "@elijahjcobb/next-api";

export const POST = createEndpoint(async (req) => {
  const rawJSON = await req.json();
  const schema = z.object({
    email: z.string().email().trim(),
  });
  const { email } = schema.parse(rawJSON);
  const code = await totpCreate({ identifier: email });
  await resend.emails.send({
    from: "Trillium Partners <otp@trillium.elijahcobb.app>",
    to: email,
    subject: "OTP Code",
    text: code,
  });
  await trackServer({ key: "user.auth" });
  return NextResponse.json({ ok: true });
});
