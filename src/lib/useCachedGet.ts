"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient } from "./apiClient";
import {
  buildCacheKey,
  clearInflight,
  getFromCache,
  getInflight,
  hasInflight,
  setInflight,
  setToCache,
} from "./cache";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

export interface UseCachedGetOptions<T = unknown> {
  params?: QueryParams;
  ttlMs?: number; // 0 disables staleness check; default 5 minutes
  revalidateOnMount?: boolean; // fetch in background even if cache hit
  revalidateOnFocus?: boolean; // refetch when window regains focus
  transform?: (data: any) => T; // optional projector
  headers?: Record<string, string>;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function useCachedGet<T = any>(
  url: string,
  options: UseCachedGetOptions<T> = {}
) {
  const {
    params,
    ttlMs = DEFAULT_TTL,
    revalidateOnMount = true,
    revalidateOnFocus = false,
    transform,
    headers,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const key = buildCacheKey(apiClient.defaults.baseURL as string, url, params);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const cached = getFromCache(key);
    if (cached.hit) {
      setData((transform ? transform(cached.data) : cached.data) as T);
    }

    const shouldRevalidate = !cached.hit || cached.stale || revalidateOnMount;

    if (shouldRevalidate) {
      void fetchAndCache();
    }

    function onFocus() {
      if (!revalidateOnFocus) return;
      void fetchAndCache();
    }

    window.addEventListener("focus", onFocus);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, url]);

  const fetchAndCache = async () => {
    try {
      setLoading(true);
      setError(null);

      if (hasInflight(key)) {
        const p = getInflight(key)!;
        const res = await p;
        if (!mountedRef.current) return;
        const value = transform ? transform(res) : res;
        setData(value as T);
        return;
      }

      const request = apiClient.get(url, { params, headers }).then((r) => r.data);
      setInflight(key, request);

      const payload = await request;
      setToCache(key, payload, ttlMs);
      if (!mountedRef.current) return;
      const value = transform ? transform(payload) : payload;
      setData(value as T);
    } catch (e: any) {
      if (!mountedRef.current) return;
      setError(e?.response?.data?.message || e?.message || "Request failed");
    } finally {
      clearInflight(key);
      if (mountedRef.current) setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchAndCache };
}

export async function preloadGet(url: string, params?: QueryParams, ttlMs = DEFAULT_TTL) {
  const key = buildCacheKey(apiClient.defaults.baseURL as string, url, params);
  if (hasInflight(key)) return getInflight(key);
  const req = apiClient.get(url, { params }).then((r) => r.data);
  setInflight(key, req);
  try {
    const data = await req;
    setToCache(key, data, ttlMs);
    return data;
  } finally {
    clearInflight(key);
  }
}


