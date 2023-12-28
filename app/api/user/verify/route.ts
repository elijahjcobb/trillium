import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "#/lib/email";
import { prisma } from "#/lib/prisma";
import { trackServer } from "#/lib/track-server";
import { createEndpoint, tokenSign, totpAssert } from "@elijahjcobb/next-api";

export const POST = createEndpoint(async (req) => {
  const rawJSON = await req.json();
  const schema = z.object({
    email: z.string().email().trim(),
    code: z.string().trim(),
  });
  const { email, code } = schema.parse(rawJSON);
  totpAssert({ identifier: email, code });
  await resend.emails.send({
    from: "Trillium Partners <otp@trillium.elijahcobb.app>",
    to: email,
    subject: "New Sign In",
    text: "You have signed in to your Trillium Partners account.",
  });

  const user = await prisma.$transaction(async (tx) => {
    let user = await tx.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      user = await tx.user.create({
        data: {
          email,
        },
      });
    }
    return user;
  });

  trackServer({ user, key: "user.login" });

  const token = tokenSign({ email }, "365d");
  const res = NextResponse.json({ token });
  res.cookies.set("token", token, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  return res;
});
