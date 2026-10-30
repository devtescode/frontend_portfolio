import { apiClient } from "@/lib/apiClient";
import type { AdminUser, LoginCredentials, LoginResponse } from "@/types/api";

/** `POST /portfolio/login` — exchanges credentials for a JWT (valid for 1h). */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>("/portfolio/login", credentials);
  return data;
};

/**
 * `GET /portfolio/me` — resolves the signed-in admin.
 *
 * The endpoint is optional on older backends, so failures must stay non-fatal
 * for callers; the normalized `ApiError` is thrown for them to handle/ignore.
 */
export const fetchCurrentUser = async (): Promise<AdminUser> => {
  const { data } = await apiClient.get<AdminUser>("/portfolio/me");
  return data;
};
