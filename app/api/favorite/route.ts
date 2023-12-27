import { prisma } from "#/lib/prisma";
import { trackServer } from "#/lib/track-server";
import { verifyUser } from "#/lib/verify-user";
import { createEndpoint } from "@elijahjcobb/next-api";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = createEndpoint(async (req) => {
  const { user } = await verifyUser(req);
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
  });

  await trackServer({ key: "favorites.list", user });

  return NextResponse.json({ favorites });
});

export const POST = createEndpoint(async (req) => {
  const { mls } = z.object({ mls: z.string() }).parse(await req.json());
  const { user } = await verifyUser(req);
  try {
    await prisma.favorite.create({
      data: {
        userId: user.id,
        mls,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ ok: true });
    }
    throw e;
  }

  await trackServer({ key: "favorites.add", user, meta: { mls } });

  return NextResponse.json({ ok: true });
});
