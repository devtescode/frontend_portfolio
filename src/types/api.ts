/**
 * Shared API contracts.
 *
 * These mirror `portfolioBackend/Models/user.image.js` and
 * `portfolioBackend/Models/user.models.js`. Keep them in sync when the
 * backend schema changes.
 */

export interface Project {
  _id: string;
  url: string;
  projectName: string;
  deployLink?: string;
  projectcode?: string;
  description?: string;
  techStack?: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Fields accepted when creating a project (multipart form). */
export interface CreateProjectInput {
  projectName: string;
  description?: string;
  deployLink?: string;
  projectcode?: string;
  techStack?: string[];
  featured?: boolean;
  image?: File | null;
}

/** Fields accepted when updating a project via JSON. */
export interface UpdateProjectInput {
  id: string;
  data: Pick<
    Project,
    "projectName" | "description" | "url" | "deployLink" | "projectcode" | "techStack" | "featured"
  >;
}

export interface ProjectNumbers {
  allProjects: number;
  oldProjects: number;
  newProjects: number;
}

export interface AdminUser {
  _id?: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  user?: AdminUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiError {
  status?: number;
  message: string;
  details?: unknown;
  isNetworkError?: boolean;
}
