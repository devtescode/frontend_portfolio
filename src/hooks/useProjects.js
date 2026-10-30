import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjectNumbers,
  fetchProjects,
  updateProject,
  uploadProjectImage,
} from '@/features/projects/api';
import { projectKeys } from '@/lib/queryKeys';

const getProjectTimestamp = (project) => {
  const createdAt = Date.parse(project.createdAt ?? '');
  if (Number.isFinite(createdAt)) return createdAt;

  // Mongo ObjectIds begin with the creation time as a Unix timestamp.
  const objectIdTime = project._id?.match(/^[a-f\d]{8}/i)?.[0];
  return objectIdTime ? Number.parseInt(objectIdTime, 16) * 1000 : 0;
};

export const useProjectsQuery = (options = {}) =>
  useQuery({
    queryKey: projectKeys.list(),
    queryFn: fetchProjects,
    ...options,
  });

export const useProjectQuery = (id, options = {}) =>
  useQuery({
    queryKey: projectKeys.detail(id ?? ''),
    queryFn: () => fetchProject(id),
    enabled: Boolean(id),
    ...options,
  });

export const useProjectNumbers = (options = {}) =>
  useQuery({
    queryKey: projectKeys.numbers(),
    queryFn: fetchProjectNumbers,
    ...options,
  });

// Convenience wrapper that keeps the old context's shape
export const useProjects = (options = {}) => {
  const query = useProjectsQuery(options);
  const projects = query.data ?? [];
  const latestProjects = [...projects]
    .sort((a, b) => getProjectTimestamp(a) - getProjectTimestamp(b))
    .slice(-3)
    .reverse();
  return {
    ...query,
    projects,
    latestProjects,
  };
};

export const useProject = (id) =>
  useProjectQuery(id);

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
      queryClient.setQueryData(projectKeys.list(), (old) =>
        old?.map((p) => (p._id === variables.id ? updated : p))
      );
      queryClient.setQueryData(projectKeys.detail(variables.id), updated);
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
    onMutate: async (id, mutationContext) => {
      await queryClient.cancelQueries({ queryKey: projectKeys.all });
      const previous = queryClient.getQueryData(projectKeys.list());
      queryClient.setQueryData(projectKeys.list(), (old) => old?.filter((p) => p._id !== id));
      const userContext = await options.onMutate?.(id, mutationContext);
      return { previous, userContext };
    },
    onSuccess: (data, id, context, mutationContext) => {
      options.onSuccess?.(data, id, context?.userContext, mutationContext);
    },
    onError: (error, id, context, mutationContext) => {
      if (context?.previous) queryClient.setQueryData(projectKeys.list(), context.previous);
      options.onError?.(error, id, context?.userContext, mutationContext);
    },
    onSettled: (data, error, id, context, mutationContext) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      options.onSettled?.(data, error, id, context?.userContext, mutationContext);
    },
  });
};
