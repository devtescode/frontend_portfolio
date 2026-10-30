import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';

export const useLogin = (options = {}) =>
  useMutation({
    mutationFn: login,
    ...options,
    onSuccess: (data, ...rest) => {
      localStorage.setItem('token', data.token);
      options.onSuccess?.(data, ...rest);
    },
  });
