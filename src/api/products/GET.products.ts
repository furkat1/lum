import axios from "axios";

import { PaginatedResponse } from "@/types";
import { Product } from "@/types/products";

import { GetProductsRequest } from "../types/products";

export const getProducts = async (params: GetProductsRequest) => {
  const response = await axios.get<PaginatedResponse<Product>>("/api/products", {
    params,
  });

  return response.data;
};
