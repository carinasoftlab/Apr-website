"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryParams = Record<string, string | number | boolean>;

interface UseApiConfig {
  params?: QueryParams;
  headers?: Record<string, string>;
  body?: unknown;
  manual?: boolean;
}

// Helper to build query string from params (optional)
function buildQuery(params?: QueryParams) {
  if (!params) return "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value != null) query.append(key, value.toString());
  });
  return query.toString() ? `?${query}` : "";
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://www.pri.arunachal.gov.in/api/v1/apr/admin";
export function useApi<T = unknown>(
  url: string,
  method: HttpMethod = "GET",
  config: UseApiConfig = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { params, headers, body, manual } = config;

  const finalUrl = `${API_BASE}${url}${buildQuery(params)}`;

  const fetchData = async (
    overrideBody?: unknown,
    overrideParams?: QueryParams
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.request({
        url: `${API_BASE}${url}${buildQuery(overrideParams ?? params)}`,
        method,
        headers: {
          ...(headers || {}),
        },
        data: overrideBody ?? body,
      });
      setData(res.data as T);
      return { ok: true as const, data: res.data as T };
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "Request failed";
      setError(message);
      setData(null);
      return { ok: false as const, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch immediately unless config.manual is set
  useEffect(() => {
    if (!manual) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalUrl, method, manual]);

  return {
    data,
    error,
    loading,
    run: fetchData, // manual trigger if needed
    refetch: fetchData,
  };
}
