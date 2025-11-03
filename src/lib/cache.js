// Lightweight in-memory cache with TTL and request de-duplication
// Works entirely on the client. Suitable for GET endpoints.

const cacheStore = new Map(); // key -> { data, updatedAt, ttlMs }
const inflightStore = new Map(); // key -> Promise

function now() {
  return Date.now();
}

export function buildCacheKey(baseURL, url, params) {
  const usp = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) usp.append(k, String(v));
    });
  }
  const qs = usp.toString();
  return `${baseURL || ''}|${url}|${qs}`;
}

export function getFromCache(key) {
  const entry = cacheStore.get(key);
  if (!entry) return { hit: false };
  const isStale = entry.ttlMs > 0 ? now() - entry.updatedAt > entry.ttlMs : false;
  return { hit: true, stale: isStale, data: entry.data, updatedAt: entry.updatedAt };
}

export function setToCache(key, data, ttlMs) {
  cacheStore.set(key, { data, updatedAt: now(), ttlMs: ttlMs ?? 0 });
}

export function hasInflight(key) {
  return inflightStore.has(key);
}

export function getInflight(key) {
  return inflightStore.get(key);
}

export function setInflight(key, promise) {
  inflightStore.set(key, promise);
}

export function clearInflight(key) {
  inflightStore.delete(key);
}

export function invalidateCache(keyPrefix) {
  // Invalidate by exact key or prefix
  for (const key of cacheStore.keys()) {
    if (!keyPrefix || key.startsWith(keyPrefix)) cacheStore.delete(key);
  }
}

export function getCacheSnapshot() {
  return Array.from(cacheStore.keys());
}


