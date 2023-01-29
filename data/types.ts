export interface Link {
  name: string;
  href?: string;
}

export type Links = Link[];

export interface Query {
  priceMin?: number;
  priceMax?: number;
  type?: ("res" | "mul" | "lnd")[];
  bedroomMin?: number;
  bathroomMin?: number;
  yearBuiltMin?: number;
  sqftMin?: number;
  sort?: { key: "price" | "listing"; order: "asc" | "des" };
  page?: number;
  county?: string;
  city?: string;
}

export interface Property {
  address: string;
  virtualTour: string | null;
  mls: string;
  sqft: number;
  baths: number;
  bathsFull: number;
  bathsHalf: number;
  bedrooms: number;
  street: string;
  lotSqft: number;
  state: string;
  images: string[];
  acres: number;
  coordinates: [number, number];
  listDate: string;
  listPrice: number;
  listPricePrevious: number | null;
  zip: string;
  city: string;
  condo: boolean;
  yearBuilt: number;
  appliances: string[];
  exteriorFeatures: string[];
  water: "well" | "municipal";
  status: string;
}

export type Response = RawProperty[];
export interface RawProperty {
  street_number: string;
  virtual_tour_url?: string;
  mls_number: string;
  baths?: number;
  interior_features?: string[];
  lot_size: number;
  amenities?: string[];
  sev_year: number;
  waterfront_name?: string;
  updated: string;
  foundation?: string[];
  images: Image[];
  longitude: number;
  water?: Water[];
  acres: number;
  office_id: string;
  status_change_or_created: string;
  year_built?: number | string;
  county: string;
  exterior?: string[];
  list_price_change?: string;
  lng_lat: number[];
  school_district: string;
  association_fee_includes?: string[];
  construction?: string[];
  living_area?: number;
  garage_description?: string[];
  street_name: string;
  terms: MoNeighborhood[];
  type: Type;
  deeded_waterfront: boolean;
  meta: object;
  building_name: string;
  list_date: string;
  list_price: number;
  show_address: boolean;
  land_features?: string[];
  latitude: number;
  baths_full?: number;
  beds?: number;
  board_name_original: BoardNameOriginal;
  enabled: boolean;
  mo_subdivision: MoNeighborhood[];
  old_list_price?: number;
  geo: object;
  zip: string;
  fireplaces_and_stoves?: FireplacesAndStove[];
  created: string;
  old_status?: OldStatus;
  remarks: string;
  lot_dimensions: string;
  heating_cooling?: string[];
  style?: string[];
  mo_neighborhood: MoNeighborhood[];
  property_id: string;
  agent_id: string;
  office_name: string;
  city: string;
  condo: boolean;
  water_features?: string[];
  roof?: string[];
  state: string;
  appliances?: string[];
  exterior_features: string[];
  baths_half?: number;
  status: string;
  sewer?: Sewer[];
  township: string;
  board: number;
  invalid: boolean;
  street: string;
  address: string;
  total_units?: number;
  zoning?: string[];
  baths_three_four?: number;
  garage_spaces?: number;
  street_dir?: string;
  taxes?: string;
  utilities?: string[];
  middle_school?: string;
  high_school?: string;
  elementary_school?: string;
  annual_association_dues?: number;
}

export enum BoardNameOriginal {
  Cmiar = "CMIAR",
  Taar = "TAAR",
}

export enum FireplacesAndStove {
  FireplaceS = "Fireplace(s)",
  Gas = "Gas",
  Masonry = "Masonry",
  None = "None",
  Stove = "Stove",
  Wood = "Wood",
}

export interface Image {
  full: string;
}

export enum MoNeighborhood {
  Cash = "Cash",
  Conventional = "Conventional",
  ConventionalMortgage = "Conventional Mortgage",
  LandContractPMM = "Land Contract/PMM",
  Other = "Other",
  The1031Exchange = "1031 Exchange",
  VeteransVA = "Veterans/VA",
}

export enum OldStatus {
  BackOnMarket = "BACK ON MARKET",
  Extend = "EXTEND",
  New = "NEW",
  PriceChange = "PRICE CHANGE",
}

export enum Sewer {
  DevelopmentSeptic = "Development Septic",
  Municipal = "Municipal",
  PrivateSeptic = "Private Septic",
  PumpBack = "Pump Back",
}

export enum Type {
  Lnd = "lnd",
  Mul = "mul",
  Res = "res",
}

export enum Water {
  Municipal = "Municipal",
  PrivateWell = "Private Well",
}
