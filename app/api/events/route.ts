import { createEndpoint } from "#/lib/create-endpoint";
import { EVENTS } from "#/lib/events";
import { noThrow } from "#/lib/no-throw";
import { prisma } from "#/lib/prisma";
import { verifyUser } from "#/lib/verify-user";
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
  const { user } = await noThrow(verifyUser(req));
  await prisma.event.createMany({
    data: events.map(({ key, meta }) => ({
      userId: "id" in user ? user.id : undefined,
      key,
      meta,
    })),
  });
  return NextResponse.json({ ok: true });
});
