import { ONE_HOUR } from "#/data/constants";
import { Property } from "#/data/types";
import { withCache } from "#/helpers/cache";
import { propertyById } from "#/helpers/search";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property>
) {
  const id = req.query.id;
  if (typeof id !== "string") {
    res.status(400).json({} as Property);
    return;
  }

  const property = await withCache(`property:${id}`, ONE_HOUR, () =>
    propertyById(id)
  );

  if (!property) {
    res.status(404).json({} as Property);
    return;
  }
  res.status(200).json(property);
}
