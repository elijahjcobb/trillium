import { NextRequest } from "next/server";
import { prisma } from "#/lib/prisma";
import { verify } from "jsonwebtoken";
import { APIError } from "./api-error";

export async function verifyUser(req: NextRequest) {
  let token: string | undefined;
  if (req.headers.has("authorization")) {
    token = req.headers.get("authorization")!.split(" ")[1];
  } else {
    token = req.cookies.get("token")?.value;
  }
  if (!token) {
    throw new APIError({
      statusCode: 401,
      message: "No token.",
      code: "auth_missing",
    });
  }
  let email: string;
  try {
    const payload = verify(token, process.env.JWT_SECRET!) as { email: string };
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
  return user;
}
