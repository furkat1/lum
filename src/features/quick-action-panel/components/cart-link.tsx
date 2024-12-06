import { Badge } from "@mui/material";
import Link from "next/link";

import { getOrderById } from "@/api/orders/GET.get-order-by-id";
import { GetOrderResponse } from "@/api/types/orders";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { CartIcon } from "@/components/icon/icons/cart-icon";
import { APP_ROUTES } from "@/config/routes";

export const CartLink = async () => {
  const cart: GetOrderResponse = await getOrderById("cart");
  const cartTotal: number = cart?.items?.reduce((partialSum, i) => partialSum + i.quantity, 0);

  return (
    <Badge badgeContent={cartTotal} color="primary">
      <Link href={APP_ROUTES.CART} aria-label="Link to cart">
        <IconWrapper Icon={CartIcon} sx={{ width: "30px", height: "30px" }} />
      </Link>
    </Badge>
  );
};
