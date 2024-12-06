import { EntityState } from "@/constants";
import { ProductCategories } from "@/constants/products";

export type GetProductsRequest = {
  limit: number;
  skip: number;
  machineType?: string;
  country?: string;
  state?: EntityState;
  category?: ProductCategories;
};
