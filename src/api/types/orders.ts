export type GetOrderResponse = {
  items: OrderItem[];
  /** TODO */
};

export type OrderItem = {
  uuid: string;
  productCode: string;
  quantity: number;
  /** TODO */
};

export type GetOpenOrdersRequest = { accountIds: string[] } | { userIds: string[] };
export type GetOpenOrdersResponse = {
  byAccount: {
    [accountId: string]: number;
  };
  byUser: {
    [userId: string]: number;
  };
};
