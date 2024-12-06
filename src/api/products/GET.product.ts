import { get } from "@/lib/network";
import { Product } from "@/types/products";

export const getProduct = async (id: string) => {
  return await get<Product>(`/products/${id}`, "");
};
