import { Stack } from "@mui/material";

import { OrderListItemSkeleton } from "./order-list-item-skeleton";

export const OrderListSkeleton = () => {
  return (
    <Stack gap={4}>
      {Array.from({ length: 4 }).map((_, index) => (
        <OrderListItemSkeleton key={index} />
      ))}
    </Stack>
  );
};
