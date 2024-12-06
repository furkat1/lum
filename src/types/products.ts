import { EntityState } from "@/constants";
import { ProductCategories, ProductPicturePurpose, ProductPictureType } from "@/constants/products";

import type { GeoMonetaryValue } from "./geo-monetary-value";
import type { MultiLanguageText } from "./multi-language-text";

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
