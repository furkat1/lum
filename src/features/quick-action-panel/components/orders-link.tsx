import { Badge } from "@mui/material";
import Link from "next/link";

import { getOpenOrdersCount } from "@/api/orders/GET.open-orders";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { OrdersIcon } from "@/components/icon/icons/orders-icon";
import { APP_ROUTES } from "@/config/routes";

export const OrdersLink = async ({ userId }: { userId: string }) => {
  const ordersLink = await getOpenOrdersCount({ userIds: [userId] });
  return (
    <Badge badgeContent={ordersLink?.byUser[userId]} color="primary">
      <Link href={APP_ROUTES.ORDERS} aria-label="Link to orders">
        <IconWrapper Icon={OrdersIcon} sx={{ width: "30px", height: "30px" }} />
      </Link>
    </Badge>
  );
};
