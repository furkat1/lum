import { useEffect, useState } from "react";

type UseFetchDataParams<Responce, Params = object> = {
  fetchFn: (params?: Params) => Promise<Responce>; // Параметры теперь опциональны
};

export const useFetchData = <Responce, Params = object>(
  params: UseFetchDataParams<Responce, Params>,
) => {
  const [data, setData] = useState<Responce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadData = async () => {
    try {
      const response = await params.fetchFn();
      setData(response);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError("");
    loadData();
  }, []);

  return {
    data,
    isLoading: loading,
    error,
  };
};
