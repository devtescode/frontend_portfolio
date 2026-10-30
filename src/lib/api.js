/**
 * Backwards-compatible API exports. All requests live in feature API modules
 * and share the authenticated apiClient; components should use React Query
 * hooks rather than calling these functions directly.
 */
export {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjectNumbers,
  fetchProjects,
  updateProject,
  uploadProjectImage,
} from "@/features/projects/api";
export { fetchCurrentUser, login } from "@/features/auth/api";
export { sendContact } from "@/features/contact/api";
