import { useState } from "react";

type UsePostOrPutDataParams<Response, Body = object> = {
  fetchFn: (body: Body) => Promise<Response>;
};

export const useMutation = <Response, Body = object>(
  params: UsePostOrPutDataParams<Response, Body>,
) => {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutation = async (body: Body) => {
    setLoading(true);
    setError("");
    try {
      const response = await params.fetchFn(body);
      setData(response);
    } catch {
      setError("Failed to post data");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    isLoading: loading,
    error,
    mutation,
  };
};
