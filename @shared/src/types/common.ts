export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type MonetaryValue = {
  price: number;
  currencyCode: string;
};

export type GeoMonetaryValue = {
  price: number;
  currencyCode: string;
  countryCode: string;
};

export type MultiLanguageText = {
  [key: string]: string;
};

export type PaginatedRequest = {
  skip?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  totalItemCount: number;
  items: T[];
};

export type RequestSortOptions = {
  sortBy?: string;
  sortDirection?: "asc" | "desc" | null;
};

export type ShippingAddress = {
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  fullName: string;
  phone: string;
  email: string;
  deliveryNotes?: string;
};

export type BillingAddress = {
  billingName?: string;
  billingCountry?: string;
  billingState?: string;
  billingCity?: string;
  billingStreet?: string;
  billingPostalCode?: string;
  attnFullName?: string;
  attnPhone?: string;
  attnEmail?: string;
};
