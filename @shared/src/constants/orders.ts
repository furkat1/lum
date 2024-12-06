export enum OrderState {
  CART = "Cart",
  PLACED = "Placed",
  IN_PROGRESS = "InProgress",
  PARTIALLY_APPROVED = "PartiallyApproved",
  APPROVED = "Approved",
  PREPED_TO_SHIP = "PrepedToShip",
  PARTIALLY_SHIPPED = "PartiallyShipped",
  SHIPPED = "Shipped",
  PARTIALLY_DELIVERED = "PartiallyDelivered",
  DELIVERED = "Delivered",
  FAILED = "Failed",
}

export const OrderReadableStates: { [key in OrderState]: string } = {
  [OrderState.CART]: OrderState.CART,
  [OrderState.PLACED]: OrderState.PLACED,
  [OrderState.IN_PROGRESS]: OrderState.IN_PROGRESS,
  [OrderState.PARTIALLY_APPROVED]: OrderState.PARTIALLY_APPROVED,
  [OrderState.APPROVED]: OrderState.APPROVED,
  [OrderState.PREPED_TO_SHIP]: OrderState.PREPED_TO_SHIP,
  [OrderState.PARTIALLY_SHIPPED]: OrderState.PARTIALLY_SHIPPED,
  [OrderState.SHIPPED]: OrderState.SHIPPED,
  [OrderState.PARTIALLY_DELIVERED]: OrderState.PARTIALLY_DELIVERED,
  [OrderState.DELIVERED]: OrderState.DELIVERED,
  [OrderState.FAILED]: OrderState.FAILED,
};

export enum CardType {
  VI = "Visa",
  MC = "MasterCard",
  AX = "American Express",
  DC = "Diner's",
  DI = "Discover",
  JC = "JCB",
  SW = "Maestro",
}
