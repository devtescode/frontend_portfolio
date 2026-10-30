import { useMutation } from '@tanstack/react-query';
import { sendContact } from '@/lib/api';

export const useSendContact = (options = {}) =>
  useMutation({
    mutationFn: sendContact,
    ...options,
  });
