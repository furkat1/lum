import { OrderState } from "@shared/constants";

import ApprovedOrderIcon from "@/app/assets/orders/ApprovedOrderIcon.svg";
import DeliveredOrderIcon from "@/app/assets/orders/DeliveredOrderIcon.svg";
import FailedOrderIcon from "@/app/assets/orders/FailedOrderIcon.svg";
import InProgressOrderIcon from "@/app/assets/orders/InProgressOrderIcon.svg";
import PlacedOrderIcon from "@/app/assets/orders/PlacedOrderIcon.svg";
import PrepToShipOrderIcon from "@/app/assets/orders/PrepToShipOrderIcon.svg";
import ShippedOrderIcon from "@/app/assets/orders/ShippedOrderIcon.svg";

export const getOrderStateImg = (state: OrderState) => {
  switch (state) {
    case OrderState.PLACED:
      return PlacedOrderIcon;

    case OrderState.IN_PROGRESS:
      return InProgressOrderIcon;

    case OrderState.APPROVED:
    case OrderState.PARTIALLY_APPROVED:
      return ApprovedOrderIcon;

    case OrderState.PREPED_TO_SHIP:
      return PrepToShipOrderIcon;

    case OrderState.PARTIALLY_SHIPPED:
      return ShippedOrderIcon;

    case OrderState.SHIPPED:
      return ShippedOrderIcon;

    case OrderState.PARTIALLY_DELIVERED:
      return DeliveredOrderIcon;
    case OrderState.DELIVERED:
      return DeliveredOrderIcon;

    case OrderState.FAILED:
      return FailedOrderIcon;

    default:
      return PlacedOrderIcon;
  }
};
