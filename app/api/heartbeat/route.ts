import { createEndpoint } from "#/lib/create-endpoint";
import { noThrow } from "#/lib/no-throw";
import { prisma } from "#/lib/prisma";
import { verifyUser } from "#/lib/verify-user";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = createEndpoint(async (req) => {
  const { href } = z
    .object({
      href: z.string(),
    })
    .parse(await req.json());
  const { user } = await noThrow(verifyUser(req));
  await prisma.heartbeat.create({
    data: {
      userId: "id" in user ? user.id : undefined,
      href,
    },
  });
  return NextResponse.json({ ok: true });
});
