import { prisma } from "#/lib/prisma";
import { verifyUser } from "#/lib/verify-user";
import { createEndpoint, noThrow } from "@elijahjcobb/next-api";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = createEndpoint(async (req) => {
  const { href } = z
    .object({
      href: z.string(),
    })
    .parse(await req.json());
  const userOrError = await noThrow(verifyUser(req));
  await prisma.heartbeat.create({
    data: {
      userId: userOrError instanceof Error ? undefined : userOrError.user.id,
      href,
    },
  });
  return NextResponse.json({ ok: true });
});
