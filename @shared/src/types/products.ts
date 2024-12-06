import {
  EntityState,
  ProductCategories,
  ProductPicturePurpose,
  ProductPictureType,
} from "../constants";
import {
  GeoMonetaryValue,
  MultiLanguageText,
  PaginatedRequest,
  PaginatedResponse,
  RequestSortOptions,
} from "./common";

export type Product = {
  uuid: string;
  state: EntityState;
  code: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  unitsInPack: string;
  prices: GeoMonetaryValue[];
  pricesBeforeDiscount?: GeoMonetaryValue[] | null;
  category: ProductCategories;
  division?: string;
  pictures: ProductPicture[];
  autoShipmentInfo: ProductAutoShipmentInfo;
  relatedMachineTypes: string[];
  dataVersion?: number;
  createdAt: string;
  modifiedAt?: string;
  modifiedBy?: string;
  modifiedByName?: string;
  schemaVersion?: string;
  circlePoints?: ProductCirclePoints;
  specialOffer?: MultiLanguageText;
  clinicalResults?: MultiLanguageText;
  technicalSpecs?: MultiLanguageText;
  country: string;
  activeFromDate: string;
  activeToDate?: string;
  publishedVersion: number;
  friendlyId: number;
};

export type ProductPicture = {
  url: string;
  purpose: ProductPicturePurpose;
  type: ProductPictureType;
};

export type ProductAutoShipmentInfo = {
  available: boolean;
  prices?: GeoMonetaryValue[];
  minAmount?: number;
  text?: MultiLanguageText;
};

export type ProductCirclePoints = {
  pointsTier1: number;
  pointsTier2: number;
  pointsTier3: number;
};

export type RecentlyPurchasedProduct = {
  product: Product;
  lastPurchasedAt: string;
};

// API types

export type GetProductsRequestParams = PaginatedRequest &
  RequestSortOptions & {
    machineType?: string;
    state?: string;
    category?: ProductCategories;
    countryCode?: string;
    uuids?: string[];
    query?: string;
    signal?: AbortSignal;
  };

export type GetProductsResponse = PaginatedResponse<Product>;
