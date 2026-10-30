import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";

/**
 * Shared defaults:
 * - 4xx responses are never retried (they will not get better).
 * - One retry for transient/network failures only.
 * - Mutations never retry, so a failed create cannot double-submit a project.
 */
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const status = (error as ApiError | undefined)?.status;
          if (status && status >= 400 && status < 500) return false;
          return failureCount < 1;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });

export const queryClient = createQueryClient();
