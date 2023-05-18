import { ONE_HOUR } from "#/data/constants";
import { Property, Query } from "#/data/types";
import { withCache } from "#/helpers/cache";
import { simpleHash } from "#/helpers/hash";
import { search } from "#/helpers/search";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property[]>
) {
  const rawQuery = req.body;
  if (typeof rawQuery !== "string") return res.status(400).end();
  const key = simpleHash(rawQuery);
  const query = JSON.parse(req.body) as Query;
  const properties = await withCache(`query:${key}`, ONE_HOUR, () =>
    search(query)
  );
  res.status(200).json(properties);
}
