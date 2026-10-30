import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { login } from "./api";
import { authKeys } from "@/lib/queryKeys";
import { useAuth } from "@/contexts/AuthContext";
import type { AdminUser, ApiError, LoginCredentials, LoginResponse } from "@/types/api";

export type LoginOptions = Omit<
  UseMutationOptions<LoginResponse, ApiError, LoginCredentials>,
  "mutationFn"
>;

/**
 * Signs the admin in.
 *
 * The backend only returns a token, so the user record is derived from the
 * submitted credentials unless the response carries an explicit `user`.
 * Persistence is delegated to `signIn`; this hook never touches localStorage.
 */
export const useLogin = (options: LoginOptions = {}) => {
  const { signIn } = useAuth();
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...rest } = options;

  return useMutation<LoginResponse, ApiError, LoginCredentials>({
    mutationFn: login,
    ...rest,
    onSuccess: async (data, credentials, context) => {
      const user: AdminUser = data.user ?? {
        email: credentials.email,
        name: "Admin",
        role: "admin",
      };

      signIn({ token: data.token, user });
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
      await onSuccess?.(data, credentials, context);
    },
    onError: (error, credentials, context) => {
      onError?.(error, credentials, context);
    },
    onSettled: (data, error, credentials, context) => {
      onSettled?.(data, error, credentials, context);
    },
  });
};

/**
 * Ends the session and drops every cached query so the next login is clean.
 * `logout` already closes over the query client; clearing here keeps the hook
 * self-contained for callers that use it directly.
 */
export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      logout();
      queryClient.clear();
    },
  });
};
