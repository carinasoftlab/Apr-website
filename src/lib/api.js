// lib/api.js
import axios from "axios";

// Create an axios instance
// Use the same fallback base URL as the rest of the app so it never becomes undefined,
// and apply a timeout so the server doesn't wait indefinitely for headers.
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://www.pri.arunachal.gov.in/api/v1/apr/admin",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // API doesn't require authentication
  timeout: 10000, // 10 seconds
});

/**
 * Generic GET request
 */
export const get = async (path, params = {}) => {
  try {
    const res = await api.get(path, { params });
    return res.data;
  } catch (error) {
    handleError("GET", path, error);
  }
};

/**
 * Generic POST request
 */
export const post = async (path, body = {}) => {
  try {
    const res = await api.post(path, body);
    return res.data;
  } catch (error) {
    handleError("POST", path, error);
  }
};

/**
 * Generic PUT request
 */
export const put = async (path, body = {}) => {
  try {
    const res = await api.put(path, body);
    return res.data;
  } catch (error) {
    handleError("PUT", path, error);
  }
};

/**
 * Generic PATCH request
 */
export const patch = async (path, body = {}) => {
  try {
    const res = await api.patch(path, body);
    return res.data;
  } catch (error) {
    handleError("PATCH", path, error);
  }
};

/**
 * Generic DELETE request
 */
export const remove = async (path) => {
  try {
    const res = await api.delete(path);
    return res.data;
  } catch (error) {
    handleError("DELETE", path, error);
  }
};

/**
 * Common Error Handler
 */
function handleError(method, path, error) {
  console.error(
    `${method} ${path} failed:`,
    error.response?.data || error.message
  );
  throw error;
}

export default api;
