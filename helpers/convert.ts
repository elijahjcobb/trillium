import { CITIES } from "#/data/constants";
import { Property, Query, RawProperty, RawQuery, Water } from "#/data/types";

export function propertyFromRawProperty(raw: RawProperty): Property {
  return {
    address: raw.address,
    virtualTour: raw.virtual_tour_url ?? null,
    mls: raw.mls_number,
    baths: raw.baths ?? 0,
    bathsFull: raw.baths_full ?? 0,
    bathsHalf: raw.baths_half ?? 0,
    bedrooms: raw.beds ?? 0,
    lotSqft: raw.lot_size ?? 0,
    images: raw.images.map((v) => v.full),
    acres: raw.acres ?? 0,
    coordinates: [raw.longitude, raw.latitude],
    sqft: raw.living_area ?? 0,
    status: raw.status,
    listDate: raw.list_date,
    street: raw.street,
    listPrice: raw.list_price,
    state: raw.state,
    listPricePrevious: raw.old_list_price ?? null,
    zip: raw.zip,
    city: raw.city,
    condo: raw.condo,
    yearBuilt: Number(raw.year_built ?? raw.sev_year),
    appliances: raw.appliances ?? [],
    exteriorFeatures: raw.exterior_features,
    water: raw.water?.indexOf(Water.Municipal) === -1 ? "well" : "municipal",
  };
}

export function convertBracketsToQuery(raw: RawQuery): Query {
  let priceMin: number | undefined = undefined;
  let priceMax: number | undefined = undefined;

  switch (raw.price) {
    case 1:
      priceMin = undefined;
      priceMax = 100_000;
      break;
    case 2:
      priceMin = 100_000;
      priceMax = 250_000;
      break;
    case 3:
      priceMin = 250_000;
      priceMax = 500_000;
      break;
    case 4:
      priceMin = 500_000;
      priceMax = 750_000;
      break;
    case 5:
      priceMin = 750_000;
      priceMax = 1_000_000;
      break;
    case 6:
      priceMin = 1_00_000;
      priceMax = 3_000_000;
      break;
    case 7:
      priceMin = 3_000_000;
      priceMax = undefined;
      break;
  }

  let type: Query["type"] = undefined;

  switch (raw.type) {
    case 1:
      type = ["res"];
      break;
    case 2:
      type = ["mul"];
      break;
    case 3:
      type = ["lnd"];
      break;
  }

  return {
    city: raw.city > 0 ? CITIES[raw.city].replace(" ", "+") : undefined,
    type,
    priceMin,
    priceMax,
    bedroomMin: raw.beds > 0 ? raw.beds : undefined,
    bathroomMin: raw.baths > 0 ? raw.baths : undefined,
    sqftMin: raw.sqft > 0 ? raw.sqft * 1000 : undefined,
    yearBuiltMin: raw.yearBuilt > 0 ? raw.yearBuilt * 10 + 1940 : undefined,
  };
}
