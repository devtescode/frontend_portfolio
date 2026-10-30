import { API_BASE_URL } from "@/lib/env";

/**
 * Legacy URL map kept for backwards compatibility with `src/lib/api.js`.
 * New code should call `apiClient` with a path instead of building full URLs.
 */
export const API_URLS = {
  adminlogin: `${API_BASE_URL}/portfolio/login`,
  register: `${API_BASE_URL}/portfolio/register`,
  me: `${API_BASE_URL}/portfolio/me`,
  getprojects: `${API_BASE_URL}/api/projects`,
  project: (id) => `${API_BASE_URL}/api/projects/${id}`,
  delectprojects: (projectId) => `${API_BASE_URL}/api/projects/${projectId}`,
  editprojects: (id) => `${API_BASE_URL}/api/projects/${id}`,
  uploadimage: (id) => `${API_BASE_URL}/api/uploadimage/${id}`,
  fetchimage: `${API_BASE_URL}/api/images`,
  upload: `${API_BASE_URL}/api/upload`,
  projectNumbers: `${API_BASE_URL}/api/projectnumbers`,
  contact: `${API_BASE_URL}/portfolio/contact`,
};
