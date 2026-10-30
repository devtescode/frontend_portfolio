import axios, { type AxiosError } from "axios";
import { API_BASE_URL } from "./env";
import type { ApiError } from "@/types/api";

export const TOKEN_STORAGE_KEY = "token";
export const USER_STORAGE_KEY = "admin_user";

/** Small wrapper so token storage lives in exactly one place. */
export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      /* storage unavailable (private mode) — session stays in memory */
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      /* no-op */
    }
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20_000,
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  const method = config.method?.toLowerCase();
  const path = (config.url ?? "").split("?")[0];
  const projectMutation =
    /^\/api\/projects\/[^/]+$/.test(path) && (method === "put" || method === "delete");
  const requiresAuthentication =
    path === "/portfolio/me" ||
    (path === "/api/upload" && method === "post") ||
    (path.startsWith("/api/uploadimage/") && method === "put") ||
    projectMutation;

  if (token && requiresAuthentication) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

/**
 * Registered by the session provider so a 401 anywhere in the app clears the
 * session and bounces the user to the login screen.
 */
export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null) => {
  unauthorizedHandler = handler;
};

export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<Record<string, unknown> | string>;
    const data = axiosError.response?.data;

    let message = axiosError.message || "Request failed";
    if (typeof data === "string" && data.trim()) {
      message = data;
    } else if (data && typeof data === "object") {
      const candidate = (data.message ?? data.error) as unknown;
      if (typeof candidate === "string" && candidate) message = candidate;
    }

    return {
      status: axiosError.response?.status,
      message,
      details: data,
      isNetworkError: !axiosError.response,
    };
  }

  return {
    message: error instanceof Error ? error.message : "Something went wrong",
  };
};

export const getErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (!error) return fallback;
  const normalized = toApiError(error);
  return normalized.message || fallback;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
      unauthorizedHandler?.();
    }
    return Promise.reject(toApiError(error));
  },
);
