import { Query } from "#/data/types";

function setParam(
  params: URLSearchParams,
  key: string,
  value: any,
  backup: string
): void {
  if (value) params.set(key, `${value}`);
  else params.set(key, backup);
}

const URL = "https://www.thetrilliumpartners.com/search/results";

export function generateLookUpString(mls: string): string {
  const params = new URLSearchParams();
  params.set("mls_number", mls);
  params.set("format", "json");
  return `${URL}?${params.toString()}`;
}

export function generateQueryString({
  priceMin,
  priceMax,
  type,
  bedroomMin,
  bathroomMin,
  yearBuiltMin,
  sqftMin,
  sort,
  page,
  county,
  city,
}: Query): string {
  const params = new URLSearchParams();

  params.set("format", "json");
  setParam(params, "list_price_min", priceMin, "all");
  setParam(params, "list_price_max", priceMax, "all");
  setParam(params, "beds_min", bedroomMin, "all");
  setParam(params, "baths_min", bathroomMin, "all");
  setParam(params, "county", county, "all");
  setParam(params, "city", city?.replace(" ", "+"), "all");
  setParam(params, "year_built_min", yearBuiltMin, "all");
  setParam(params, "area_min", sqftMin, "all");
  setParam(params, "page", page, "1");
  setParam(params, "page", page, "1");

  if (sort) {
    if (sort.key === "price" && sort.order === "asc")
      params.set("sort_lowest", "true");
    if (sort.key === "price" && sort.order === "des")
      params.set("sort_highest", "true");
    if (sort.key === "listing" && sort.order === "asc")
      params.set("sort_latest", "true");
    if (sort.key === "listing" && sort.order === "des")
      params.set("sort_oldest", "true");
  }

  let paramString = params.toString();

  if (type && type.length > 0) {
    for (const value of type) paramString += `&type=${value}`;
  }

  return `${URL}?${paramString}`;
}
