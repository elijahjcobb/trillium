import { EVENTS } from "#/lib/events";
import { prisma } from "#/lib/prisma";
import { verifyUser } from "#/lib/verify-user";
import { createEndpoint, noThrow } from "@elijahjcobb/next-api";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = createEndpoint(async (req) => {
  const events = z
    .array(
      z.object({
        key: z.enum(EVENTS),
        meta: z.optional(z.object({})),
      })
    )
    .parse(await req.json());
  const userOrError = await noThrow(verifyUser(req));
  await prisma.event.createMany({
    data: events.map(({ key, meta }) => ({
      userId: userOrError instanceof Error ? undefined : userOrError.user.id,
      key,
      meta,
    })),
  });
  return NextResponse.json({ ok: true });
});
