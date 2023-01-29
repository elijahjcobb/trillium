import { Property, Query, Response } from "#/data/types";
import { propertyFromRawProperty } from "./convert";
import { fetcher } from "./fetcher";
import {
  generateQueryString,
  generateLookUpString,
} from "./generate-query-string";

export async function search(query: Query): Promise<Property[]> {
  const properties: Property[] = [];
  try {
    const url = generateQueryString(query);
    const res = await fetcher<Response>({ url });
    for (const property of res) {
      if (property) properties.push(propertyFromRawProperty(property));
    }
  } catch (e) {
    console.error("Failed to fetch properties.");
  }
  return properties;
}

export async function propertyById(id: string): Promise<Property | undefined> {
  const url = generateLookUpString(id);
  const res = await fetcher<Response>({ url });
  const raw = res[0];
  if (!raw) return undefined;
  return propertyFromRawProperty(raw);
}

export async function topProperties(limit: number = 6): Promise<Property[]> {
  try {
    const properties = await search({
      priceMax: 4_000_000,
      priceMin: 500_000,
      bedroomMin: 3,
      type: ["res"],
    });
    if (properties.length > limit) properties.splice(limit);
    return properties;
  } catch (e) {
    console.error(e);
    return [];
  }
}
