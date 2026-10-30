import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { sendContact, type ContactResponse } from "./api";
import type { ApiError, ContactPayload } from "@/types/api";

export type SendContactOptions = Omit<
  UseMutationOptions<ContactResponse, ApiError, ContactPayload>,
  "mutationFn"
>;

/**
 * Sends the contact form. There is no cached data to invalidate, so the
 * mutation only chains through the caller's callbacks.
 */
export const useSendContact = (options: SendContactOptions = {}) => {
  const { onSuccess, onError, onSettled, ...rest } = options;

  return useMutation<ContactResponse, ApiError, ContactPayload>({
    mutationFn: sendContact,
    ...rest,
    onSuccess: (data, variables, context) => {
      onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);
    },
  });
};
