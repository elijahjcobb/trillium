"use server";

import { Property } from "#/data/types";
import { convertBracketsToQuery } from "#/helpers/convert";
import { search } from "#/helpers/search";

export async function fetchPropertiesForQuery(
  data: FormData
): Promise<Property[]> {
  const query = convertBracketsToQuery({
    city: parseInt(data.get("city") as string),
    type: parseInt(data.get("type") as string),
    price: parseInt(data.get("price") as string),
    beds: parseInt(data.get("beds") as string),
    baths: parseInt(data.get("baths") as string),
    sqft: parseInt(data.get("sqft") as string),
    yearBuilt: parseInt(data.get("year") as string),
  });
  return await search(query);
}
