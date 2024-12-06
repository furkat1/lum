import { CardType, OrderState } from "../constants";
import {
  BillingAddress,
  GeoMonetaryValue,
  MonetaryValue,
  MultiLanguageText,
  Nullable,
  PaginatedRequest,
  PaginatedResponse,
  RequestSortOptions,
  ShippingAddress,
} from "./common";
import { OrderCouponInfo } from "./coupons";
import { ProductCirclePoints, ProductPicture } from "./products";

export type Order = {
  uuid: string;
  createdAt: string;
  modifiedAt: string;
  orderNumber?: string;
  userUuid?: string;
  orderState?: OrderState;
  orderTime?: string;
  accountInfo?: OrderAccountInfo;
  userInfo?: OrderUserInfo;
  shippingOption?: string;
  shippingAddress?: ShippingAddress;
  shippingCost: Nullable<MonetaryValue>;
  shippingCostUndiscounted: Nullable<MonetaryValue>;
  billingAddress?: BillingAddress;
  pointsInfo?: OrderPointsInfo;
  couponInfo?: OrderCouponInfo;
  items?: OrderItem[];
  itemsSubTotal: Nullable<MonetaryValue>;
  totalToPay?: Nullable<MonetaryValue>;
  paymentInfo?: OrderPaymentInfo;
  sapOrderNumber?: string;
  taxPercentage?: number;
  taxValue?: Nullable<MonetaryValue>;
  statesHistory?: OrderStateChange[];
  cartActiveUntil?: string;
  shipments?: Shipment[];
};

export type AutoshipmentInfo = {
  available: boolean;
  MonetaryValues: MonetaryValue[];
  minAmount: number;
  text: MultiLanguageText;
};

export type OrderItem = {
  uuid: string;
  productName: MultiLanguageText;
  productCode: string;
  productPictures?: ProductPicture[];
  MonetaryValueAndCurrency: MonetaryValue;
  quantity: number;
  totalLine: MonetaryValue;
  autoshipment: boolean;
  autoShipmentInfo: AutoshipmentInfo;
  unitsInPack?: number;
  relatedMachineTypes?: string[];
  circlePoints?: ProductCirclePoints;
  transferredToSap?: boolean;
};

export type OrderAccountInfo = {
  accountId: string;
  accountName?: string;
  accountNumberSalesforce?: string;
  sapIdc?: string;
};

export type OrderUserInfo = {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  salesforceUserId?: string;
  contactTitle?: string;
};

export type OrderPointsInfo = {
  totalPointsCredited?: number;
  pointsRedeemed?: number;
  pointsDiscount?: MonetaryValue;
};

export type OrderPaymentInfo = {
  amount: number;
  transactionId: string;
  cardHolderName: string;
  cardType: keyof typeof CardType;
  cardNumberToken: string;
  cardSecurityCode: string;
  expMonth: string;
  expYear: string;
  carriageCost: MonetaryValue;
  tax: MonetaryValue;
  authorizationCode: string;
  authorizationReferenceCode: string;
  authorizationTimestamp: string;
  paymentExecutionInfo: PaymentExecutionInfo;
};

export type PaymentExecutionInfo = {
  paymentRequest: string;
  paymentResponse?: string;
  paymentPreAuthRequest?: string;
  paymentPreAuthResponse?: string;
  paymentAuthRequest?: string;
  paymentAuthResponse?: string;
};

export type Shipment = {
  delivery?: string;
  shipmentItems?: ShipmentItem[];
  waitingForApprovalDate?: string;
  whProcessingDate?: string;
  shippedDate?: string;
  linkToCourier?: string;
  trackingNumber?: string;
  trackingLink?: string;
  shipVia?: string;
  status?: string;
  deliveryStatusInfo?: DeliveryStatusInfo;
};

export type ShipmentItem = {
  orderItem?: string;
  material?: string;
  materialDescription?: string;
  deliveryItem?: string;
  orderQuantity?: string | number;
  deliveryQuantity?: string | number;
  unitPrice?: GeoMonetaryValue;
  totalPrice?: MonetaryValue;
};

export type DeliveryStatusInfo = {
  delivered?: boolean;
  deliveryStatusCode?: string;
  deliveryStatusCodeDescription?: string;
  deliverySubStatusCode: string;
  deliverySubStatusCodeDescription: string;
  trackingService: string;
  lastModified: string;
};

export type OrderStateChange = {
  orderState: OrderState;
  modifiedAt: string;
};

// API types
export type GetOrdersRequest = PaginatedRequest &
  RequestSortOptions & {
    accountId?: string;
    state?: OrderState[];
    userid?: string;
    query?: string;
    accountName?: string;
    sapId?: string;
    signal?: AbortSignal;
  };

export type GetOrdersResponse = PaginatedResponse<Order>;
