import { Order } from "@shared/types";
import { format } from "date-fns";

import { DATE_FORMAT } from "@/config/dates";
import { getPriceString } from "@/lib/price";

import { OrderListItemProps } from "../types";

export const orderToListItem = (order: Order): OrderListItemProps => {
  return {
    orderNumber: order.orderNumber || "NA",
    createdAt: format(new Date(order.createdAt), DATE_FORMAT),
    totalToPay: getPriceString(order.totalToPay),
    pointsRedeemed: order.pointsInfo?.pointsRedeemed || "0",
    orderState: order.orderState,
  };
};
