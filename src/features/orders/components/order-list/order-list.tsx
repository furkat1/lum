"use client";

import { styled, Typography } from "@mui/material";
import { GetOrdersResponse } from "@shared/types";
// import axios from "axios";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { usePaginatedData } from "@/hooks/usePaginatedData";

import { orderToListItem } from "../../helpers/order-to-list-item";
import { OrderListItem } from "./order-list-item";
import { OrderListItemSkeleton } from "./order-list-item-skeleton";

export type OrderListProps = {
  initialData: GetOrdersResponse;
};

export const OrderList: FC<OrderListProps> = ({ initialData }) => {
  const { items, total, error, loadMore } = usePaginatedData({
    // fetchFn: () => axios.get<PaginatedResponse<Order>>("/api/orders").then((res) => res.data),
    fetchFn: async (arg) => {
      console.log(arg);
      return {
        items: [],
        totalItemCount: initialData.totalItemCount,
      };
    },
    additionalParams: {},
    initialData,
  });

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <StyledInfiniteScroll
      dataLength={items.length || 0}
      next={loadMore}
      hasMore={total > items.length}
      loader={<OrderListItemSkeleton />}
    >
      {items.map((order, i) => {
        return <OrderListItem key={order.uuid} {...orderToListItem(order)} selected={i === 1} />;
      })}
    </StyledInfiniteScroll>
  );
};

const StyledInfiniteScroll = styled(InfiniteScroll)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 32,
  paddingLeft: 8,
}));
