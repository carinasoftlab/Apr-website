import axios from "axios";

// Centralized Axios client used across the app.
// We add a sane timeout so requests don't hang forever on the server
// (which can surface as HeadersTimeoutError / fetch failed in Next.js).
export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://www.pri.arunachal.gov.in/api/v1/apr/admin",
  headers: {
    "Content-Type": "application/json",
  },
  // Fail fast instead of hanging indefinitely
  timeout: 10000, // 10 seconds
});
