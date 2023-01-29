import { Property } from "#/data/types";
import { search } from "#/helpers/search";
import type { NextApiRequest, NextApiResponse } from "next";

// all places
// https://www.thetrilliumpartners.com/search/results/?county=all&city=all&type=res&type=mul&type=lnd&list_price_min=50000&list_price_max=7000000&beds_min=all&baths_min=all&year_built_min=1903&area_min=all&format=json
// page x
// https://www.thetrilliumpartners.com/search/results/?county=all&city=all&type=res&type=mul&type=lnd&list_price_min=50000&list_price_max=7000000&beds_min=all&baths_min=all&year_built_min=1903&area_min=all&page=5&format=json

// all in TC
// https://www.thetrilliumpartners.com/search/results/?county=all&city=Traverse+City&type=res&list_price_min=50000&list_price_max=all&beds_min=all&baths_min=all&year_built_min=all&area_min=all&format=json

// by mls
// https://www.thetrilliumpartners.com/search/results/?mls_number=1902949&format=json

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ properties: Property[] }>
) {
  const properties = await search({});
  res.status(200).json({ properties });
}
