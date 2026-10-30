import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
  uploadProjectImage,
} from '@/lib/api';

export const projectKeys = {
  all: ['projects'],
};

export const useProjectsQuery = (options = {}) =>
  useQuery({
    queryKey: projectKeys.all,
    queryFn: fetchProjects,
    ...options,
  });

// Convenience wrapper that keeps the old context's shape
export const useProjects = () => {
  const query = useProjectsQuery();
  const projects = query.data ?? [];
  return {
    ...query,
    projects,
    latestProjects: projects.slice(0, 3),
  };
};

export const useProject = (id) =>
  useProjectsQuery({
    select: (projects) => projects.find((p) => p._id === id) ?? null,
  });

export const useCreateProject = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      options.onSuccess?.(...args);
    },
  });
};

export const useUpdateProject = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    ...options,
    onSuccess: (updated, variables, ...rest) => {
      queryClient.setQueryData(projectKeys.all, (old) =>
        old?.map((p) => (p._id === variables.id ? updated : p))
      );
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      options.onSuccess?.(updated, variables, ...rest);
    },
  });
};

export const useUploadProjectImage = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProjectImage,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      options.onSuccess?.(...args);
    },
  });
};

export const useDeleteProject = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    ...options,
    // Optimistically remove from the list
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: projectKeys.all });
      const previous = queryClient.getQueryData(projectKeys.all);
      queryClient.setQueryData(projectKeys.all, (old) => old?.filter((p) => p._id !== id));
      return { previous };
    },
    onError: (error, id, context, ...rest) => {
      if (context?.previous) queryClient.setQueryData(projectKeys.all, context.previous);
      options.onError?.(error, id, context, ...rest);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};
