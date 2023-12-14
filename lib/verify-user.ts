import { NextRequest } from "next/server";
import { prisma } from "#/lib/prisma";
import { verify } from "jsonwebtoken";

export async function verifyUser(req: NextRequest) {
  let token: string | undefined;
  if (req.headers.has("authorization")) {
    token = req.headers.get("authorization")!.split(" ")[1];
  } else {
    token = req.cookies.get("token")?.value;
  }
  if (!token) {
    throw new Error("No token provided.");
  }
  const { email } = verify(token, process.env.JWT_SECRET!) as { email: string };
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
}
