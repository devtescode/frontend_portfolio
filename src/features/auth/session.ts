import { tokenStore, USER_STORAGE_KEY } from "@/lib/apiClient";
import type { AdminUser } from "@/types/api";

/**
 * Session persistence helpers. The token is the source of truth for "am I
 * logged in"; the user record is only used to render the admin chrome.
 */

const asAdminUser = (value: unknown): AdminUser | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<AdminUser>;
  if (typeof candidate.email !== "string" || !candidate.email) return null;
  return {
    _id: candidate._id,
    email: candidate.email,
    name: candidate.name ?? "Admin",
    role: candidate.role ?? "admin",
  };
};

export const readStoredUser = (): AdminUser | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return asAdminUser(JSON.parse(raw));
  } catch {
    return null;
  }
};

export interface PersistedSession {
  token: string | null;
  user: AdminUser | null;
}

export const readStoredSession = (): PersistedSession => {
  const session = { token: tokenStore.get(), user: readStoredUser() };
  if (!isSessionValid(session)) {
    if (session.token) clearStoredSession();
    return { token: null, user: null };
  }
  return session;
};

export interface SessionInput {
  token: string;
  user: AdminUser;
}

export const persistSession = ({ token, user: rawUser }: SessionInput): PersistedSession => {
  tokenStore.set(token);

  const user =
    asAdminUser(rawUser) ??
    ({
      email: "",
      name: "Admin",
      role: "admin",
    } as AdminUser);

  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch {
    /* no-op */
  }

  return { token, user };
};

export const clearStoredSession = () => {
  tokenStore.clear();
};

export const isSessionValid = (session: PersistedSession) =>
  Boolean(session.token && session.user && !isTokenExpired(session.token));

const isTokenExpired = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return false;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const claims = JSON.parse(atob(padded));
    return typeof claims.exp === "number" && claims.exp * 1000 <= Date.now();
  } catch {
    // The API remains responsible for validating tokens; malformed tokens will
    // be rejected there and cleared by the 401 interceptor.
    return false;
  }
};

