import { Property, Query } from "#/data/types";
import { search } from "#/helpers/search";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property[]>
) {
  const query = JSON.parse(req.body) as Query;
  const properties = await search(query);
  res.status(200).json(properties);
}
