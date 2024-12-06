import axios from "axios";

export const putOrder = async ({
  orderId,
  itemId,
  orderData,
}: {
  orderId: string;
  itemId: string;
  orderData: unknown;
}) => {
  const response = await axios.put<unknown>(`/api/orders/${orderId}/items/${itemId}`, orderData);

  return response.data;
};
