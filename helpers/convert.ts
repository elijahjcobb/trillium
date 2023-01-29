import { Property, RawProperty, Water } from "#/data/types";

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
