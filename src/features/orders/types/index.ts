import { OrderState } from "@shared/constants";

export type OrderListItemProps = {
  orderNumber?: string;
  createdAt?: string;
  totalToPay?: string;
  pointsRedeemed?: string | number;
  orderState?: OrderState;
  selected?: boolean;
};
