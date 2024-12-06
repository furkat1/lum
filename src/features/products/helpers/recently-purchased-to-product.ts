import type { Product, RecentlyPurchasedProduct } from "@/types/products";

export const recentlyPurchasedToProduct = (
  recentlyPurchased: RecentlyPurchasedProduct,
): Product => {
  return {
    ...recentlyPurchased.product,
  };
};
