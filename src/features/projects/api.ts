import { apiClient, toApiError } from "@/lib/apiClient";
import type {
  CreateProjectInput,
  Project,
  ProjectNumbers,
  UpdateProjectInput,
} from "@/types/api";

export interface CreateProjectResult {
  imageUrl: string;
}

export interface UploadProjectImageResult {
  url: string;
  project: Project;
}

/** Newest first, matching the legacy `src/lib/api.js` behaviour. */
const sortNewestFirst = (projects: Project[]): Project[] =>
  [...projects].sort(
    (a, b) =>
      new Date(b.createdAt || b._id).getTime() - new Date(a.createdAt || a._id).getTime(),
  );

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await apiClient.get<Project[]>("/api/projects");
  return sortNewestFirst(data);
};

export const fetchProject = async (id: string): Promise<Project> => {
  try {
    const { data } = await apiClient.get<Project>(`/api/projects/${id}`);
    return data;
  } catch (error) {
    if (toApiError(error).status !== 404) throw error;

    // The detail endpoint may not exist yet — fall back to the list cache/API.
    const projects = await fetchProjects();
    const project = projects.find((item) => item._id === id);
    if (!project) throw error;
    return project;
  }
};

export const fetchProjectNumbers = async (): Promise<ProjectNumbers> => {
  const { data } = await apiClient.get<ProjectNumbers>("/api/projectnumbers");
  return data;
};

const buildCreateFormData = (input: CreateProjectInput): FormData => {
  const formData = new FormData();
  if (input.image) formData.append("image", input.image);
  formData.append("projectName", input.projectName);
  formData.append("deployLink", input.deployLink ?? "");
  formData.append("projectcode", input.projectcode ?? "");
  formData.append("description", input.description ?? "");
  if (input.techStack) formData.append("techStack", JSON.stringify(input.techStack));
  if (typeof input.featured === "boolean") {
    formData.append("featured", String(input.featured));
  }
  return formData;
};

/**
 * Accepts a prepared `FormData` as well, so legacy callers that build the
 * multipart payload themselves keep working during the migration.
 */
export const createProject = async (
  input: CreateProjectInput | FormData,
): Promise<CreateProjectResult> => {
  const formData = input instanceof FormData ? input : buildCreateFormData(input);
  const { data } = await apiClient.post<CreateProjectResult>("/api/upload", formData);
  return data;
};

export const updateProject = async ({ id, data }: UpdateProjectInput): Promise<Project> => {
  const { data: project } = await apiClient.put<Project>(`/api/projects/${id}`, {
    projectName: data.projectName,
    description: data.description,
    url: data.url,
    deployLink: data.deployLink,
    projectcode: data.projectcode,
    techStack: data.techStack,
    featured: data.featured,
  });
  return project;
};

export const uploadProjectImage = async ({
  id,
  file,
}: {
  id: string;
  file: File;
}): Promise<UploadProjectImageResult> => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await apiClient.put<UploadProjectImageResult>(
    `/api/uploadimage/${id}`,
    formData,
  );
  return data;
};

export const deleteProject = async (id: string): Promise<string> => {
  await apiClient.delete(`/api/projects/${id}`);
  return id;
};
