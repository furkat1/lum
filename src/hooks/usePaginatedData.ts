import { useEffect, useState } from "react";

import { PaginatedResponse } from "@/types";

const DEFAULT_PAGE_SIZE = 12;

type UsePaginatedDataParams<ItemType, Params> = {
  fetchFn: (arg: { limit: number; skip: number } & Params) => Promise<PaginatedResponse<ItemType>>;
  additionalParams: Params;
  initialData?: PaginatedResponse<ItemType>;
};

export const usePaginatedData = <ItemType, Params>(
  params: UsePaginatedDataParams<ItemType, Params>,
) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PaginatedResponse<ItemType> | null>(params.initialData || null);
  const [loading, setLoading] = useState(!params.initialData);
  const [error, setError] = useState<string>("");

  const pageSize = params.initialData?.items.length || DEFAULT_PAGE_SIZE;

  const loadData = async () => {
    try {
      const requestParams = {
        limit: pageSize,
        skip: page * pageSize,
      };

      const response = await params.fetchFn({ ...requestParams, ...params.additionalParams });

      setData((prev) => ({
        items: prev ? [...prev.items, ...response.items] : response.items,
        totalItemCount: response.totalItemCount,
      }));
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.initialData) {
      setData(params.initialData);
      setLoading(false);
      return;
    }

    setPage(0);
    setLoading(true);
    setData(null);
    setError("");
  }, [params.additionalParams]);

  useEffect(() => {
    if (!params.initialData || page > 0) {
      loadData();
    }
  }, [page, params.additionalParams]);

  return {
    items: data?.items || [],
    total: data?.totalItemCount || 0,
    isEmpty: !loading && data && data?.totalItemCount === 0,
    isLoadingInitial: loading && !data,
    error,
    loadMore: () => setPage((prev) => prev + 1),
  };
};
