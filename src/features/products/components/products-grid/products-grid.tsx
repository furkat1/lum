"use client";
import { Box, styled, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getProducts } from "@/api/products/GET.products";
import { getRecentlyPurchasedProducts } from "@/api/products/GET.recently-purchased";
import { SEARCH_PARAMS } from "@/config/search-params";
import { EntityState } from "@/constants";
import { ProductCategories } from "@/constants/products";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { Product } from "@/types/products";

import { recentlyPurchasedToProduct } from "../../helpers/recently-purchased-to-product";
import { ProductCard, ProductCardSkeleton } from "../product-card";
import { ProductsGridEmpty } from "./products-grid-empty";
import { ProductsGridSkeleton } from "./products-grid-skeleton";

const fetchFn =
  (recentlyPurchased?: boolean) =>
  async (params: { limit: number; skip: number; machineType?: string }) => {
    if (recentlyPurchased) {
      const response = await getRecentlyPurchasedProducts({
        limit: params.limit,
        skip: params.skip,
      });

      return {
        totalItemCount: response.totalItemCount,
        items: response.items.map((item) => recentlyPurchasedToProduct(item)),
      };
    }

    const response = await getProducts({
      ...params,
      state: EntityState.PUBLISHED,
      category: ProductCategories.CONSUMABLES,
      country: "USA",
    });

    return response;
  };

export type ProductsGridProps = {
  recentlyPurchased?: boolean;
};

export const ProductsGrid: FC<ProductsGridProps> = ({ recentlyPurchased }) => {
  const searchParams = useSearchParams();

  const machineType = searchParams.get(SEARCH_PARAMS.MACHINE_TYPE) || undefined;

  const requestParams: { machineType?: string } = useMemo(() => {
    return {
      machineType,
    };
  }, [machineType, recentlyPurchased]);

  const { items, total, isEmpty, isLoadingInitial, error, loadMore } = usePaginatedData<
    Product,
    { machineType?: string }
  >({
    fetchFn: fetchFn(recentlyPurchased),
    additionalParams: requestParams,
  });

  if (isLoadingInitial) {
    return <ProductsGridSkeleton />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (isEmpty) {
    return (
      <EmptyContainer>
        <ProductsGridEmpty />
      </EmptyContainer>
    );
  }

  return (
    <StyledInfiniteScroll
      dataLength={items.length || 0}
      next={loadMore}
      hasMore={total > items.length}
      loader={<ProductCardSkeleton />}
    >
      {items.map((product) => {
        return (
          <ProductCard key={product.uuid} product={product} recentlyPurchased={recentlyPurchased} />
        );
      })}
    </StyledInfiniteScroll>
  );
};

const StyledInfiniteScroll = styled(InfiniteScroll)(() => ({
  display: "flex",
  flexWrap: "wrap",
  rowGap: 64,
  columnGap: 32,
}));

const EmptyContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}));
