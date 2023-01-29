import { Property } from "#/data/types";
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
  const property = await propertyById(id);

  if (!property) {
    res.status(404).json({} as Property);
    return;
  }
  res.status(200).json(property);
}
