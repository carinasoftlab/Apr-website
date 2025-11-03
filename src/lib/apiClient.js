import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://www.pri.arunachal.gov.in/api/v1/apr/admin",
  headers: {
    "Content-Type": "application/json",
  },
});
