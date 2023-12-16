import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import { z } from "zod";
import { resend } from "#/lib/email";
import { sign } from "jsonwebtoken";
import { createEndpoint } from "#/lib/create-endpoint";
import { APIError } from "#/lib/api-error";
import { prisma } from "#/lib/prisma";
import { trackServer } from "#/lib/track-server";

export const POST = createEndpoint(
  async (req: NextRequest): Promise<NextResponse> => {
    const rawJSON = await req.json();
    const schema = z.object({
      email: z.string().email().trim(),
      code: z.string().trim(),
    });
    const { email, code } = schema.parse(rawJSON);
    const key = await kv.get<string | undefined>(`otp:${email}`);
    if (!key) {
      throw new APIError({
        statusCode: 400,
        message: "You must call `/api/user/auth` first.",
        code: "invalid_state",
      });
    }
    const isValid = authenticator.verify({ token: code, secret: key });
    if (!isValid) {
      throw new APIError({
        statusCode: 401,
        message: "Incorrect OTP.",
        code: "incorrect_totp_token",
      });
    }
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

    const token = sign({ email }, process.env.JWT_SECRET!);
    const res = NextResponse.json({ token });
    res.cookies.set("token", token);
    return res;
  }
);
