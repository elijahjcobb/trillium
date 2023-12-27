import { createEndpoint } from "@elijahjcobb/next-api";
import { prisma } from "#/lib/prisma";
import { trackServer } from "#/lib/track-server";
import { verifyUser } from "#/lib/verify-user";
import { NextResponse } from "next/server";

export const GET = createEndpoint(async (req, getParam) => {
  const mls = getParam();
  const { user } = await verifyUser(req);
  const favorites = await prisma.favorite.count({
    where: {
      userId: user.id,
      mls,
    },
  });

  await trackServer({ key: "favorites.read", user, meta: { mls } });

  return NextResponse.json({ liked: favorites > 0 });
});

export const DELETE = createEndpoint(async (req, getParam) => {
  const mls = getParam();
  const { user } = await verifyUser(req);

  await prisma.favorite.delete({
    where: {
      userId_mls: {
        userId: user.id,
        mls,
      },
    },
  });

  await trackServer({ key: "favorites.remove", user, meta: { mls } });

  return NextResponse.json({ ok: true });
});
