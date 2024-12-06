import { Suspense } from "react";

import { OrderListContainer, OrderListSkeleton } from "@/features/orders/components/order-list";

export default function Orders() {
  return (
    <Suspense fallback={<OrderListSkeleton />}>
      <OrderListContainer />
    </Suspense>
  );
}
