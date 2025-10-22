import axios from "axios";
import { env } from "@/env";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      !error.response ||
      [500, 502, 503, 504].includes(error.response?.status)
    ) {
      if (typeof window !== "undefined") {
        if (!window.location.pathname.includes("/app-down")) {
          window.location.href = "/app-down";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
