import { CouponTypes, EntityState, ShippingOptions } from "../constants";
import { MonetaryValue, MultiLanguageText } from "./common";

export type Coupon = {
  uuid: string;
  friendlyId: number;
  state: EntityState;
  title: MultiLanguageText;
  text: MultiLanguageText;
  activeFromDate: string;
  activeToDate?: string;
  country: string;
  couponUsageLimit: CouponUsageLimit;
  couponInfo:
    | PercentDiscountOnItemsCoupon
    | FixedDiscountOnTotalCoupon
    | FreeShippingCoupon
    | FixedPointsOnTotalCoupon;
  allAccountsEntitled: boolean;
  entitledAccountGroups?: string[];
  createdAt: string;
  modifiedAt: string;
  modifiedBy: string;
  schemaVersion: string;
  publishedVersion: number;
  segmentId: string;
};

export type PercentDiscountOnItemsCoupon = {
  couponType: CouponTypes.PERCENT_DISCOUNT_ON_ITEMS;
  minItemsNumber: number;
  percentOnOfferedItems: number;
  productUuids: string[];
};

export type FixedDiscountOnTotalCoupon = {
  couponType: CouponTypes.FIXED_DISCOUNT_ON_TOTAL;
  minTotalPrice: MonetaryValue;
  discountOnTotal: MonetaryValue;
};

export type FreeShippingCoupon = {
  couponType: CouponTypes.FREE_SHIPPING;
  freeShippingOptions: ShippingOptions[];
};

export type FixedPointsOnTotalCoupon = {
  couponType: CouponTypes.FIXED_POINTS_ON_TOTAL;
  minTotalPrice: MonetaryValue;
  fixedPointsOnTotal: number;
};

export type OrderCouponInfo = {
  couponCode?: string;
  couponDiscount?: MonetaryValue;
  freeShippingProvided?: boolean;
  couponType?: CouponType;
  couponSnapshot?: Coupon;
  shippingDiscount?: MonetaryValue;
};

export type CouponType =
  | "PERCENT_DISCOUNT_ON_ITEMS"
  | "FIXED_DISCOUNT_ON_TOTAL"
  | "FREE_SHIPPING"
  | "PERCENT_OF_TOTAL_IN_POINTS";

export type CouponUsageLimit = {
  limitPerAccount?: number;
};

export type CouponInfo =
  | PercentDiscountOnItemsCoupon
  | FixedDiscountOnTotalCoupon
  | FreeShippingCoupon
  | FixedPointsOnTotalCoupon;
