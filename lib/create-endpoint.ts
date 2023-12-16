import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { APIError } from "./api-error";
import { ZodError } from "zod";

export function createEndpoint(
  handler: (req: NextRequest, id: () => string) => Promise<NextResponse>
): (
  req: NextRequest,
  { params }: { params: { id: string } }
) => Promise<NextResponse> {
  return async (
    req: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> => {
    try {
      try {
        return await handler(req, () => {
          const id = params.id as string | undefined;
          if (!id) {
            throw new APIError({
              statusCode: 400,
              message: "Missing id parameter.",
              code: "invalid_query",
            });
          }
          return id;
        });
      } catch (e) {
        if (e instanceof ZodError) {
          throw new APIError({
            statusCode: 400,
            message: "Invalid types, see `types` property.",
            code: "type_mismatch",
            types: e.issues,
          });
        }

        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2025" || e.code === "P2023") {
            throw new APIError({
              statusCode: 404,
              message: "Item not found.",
              code: "resource_not_found",
            });
          }
        }
        throw e;
      }
    } catch (e) {
      console.error(e);
      if (e instanceof APIError) {
        return NextResponse.json(
          {
            message: e.message,
            code: e.code,
            statusCode: e.statusCode,
            types: e.types,
          },
          { status: e.statusCode }
        );
      }
      return NextResponse.json(
        {
          message: "Internal server error.",
          code: "internal_server_error",
          statusCode: 500,
        },
        { status: 500 }
      );
    }
  };
}
