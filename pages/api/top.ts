import { Property } from "#/data/types";
import { search } from "#/helpers/search";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ properties: Property[] }>
) {
  const properties = await search({
    priceMax: 4_000_000,
    priceMin: 500_000,
    bedroomMin: 3,
    type: ["res"],
  });
  properties.splice(6);
  res.status(200).json({ properties });
}
