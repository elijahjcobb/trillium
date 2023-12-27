import { NextRequest } from "next/server";
import { prisma } from "#/lib/prisma";
import { User } from "@prisma/client";
import { APIError, tokenVerify } from "@elijahjcobb/next-api";

export async function verifyUser(
  req?: NextRequest
): Promise<{ user: User; isAdmin: boolean }> {
  let email: string;
  try {
    const payload = tokenVerify(req) as {
      email: string;
    };
    email = payload.email;
  } catch (e) {
    throw new APIError({
      statusCode: 401,
      message: "Invalid token.",
      code: "auth_invalid",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new APIError({
      statusCode: 401,
      message: "User does not exist.",
      code: "auth_invalid",
    });
  }
  return { user, isAdmin: false };
}
