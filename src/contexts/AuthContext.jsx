import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setUnauthorizedHandler } from "@/lib/apiClient";
import { clearStoredSession, persistSession, readStoredSession } from "@/features/auth/session";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Session state for the admin area.
 *
 * The previous implementation carried hard-coded demo credentials and a fake
 * `login()`. Authentication now goes through `useLogin` (a React Query
 * mutation); this provider only owns persistence and exposes `signIn`/`logout`.
 */
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState(readStoredSession);

  const logout = useCallback(() => {
    clearStoredSession();
    setSession({ token: null, user: null });
    // Drop any cached admin data so the next login starts clean.
    queryClient.clear();
  }, [queryClient]);

  // A 401 from any request clears the session and bounces to /admin/login.
  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  const signIn = useCallback((payload) => {
    setSession(persistSession(payload));
  }, []);

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: Boolean(session.token && session.user),
      isLoading: false,
      signIn,
      logout,
    }),
    [session, signIn, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
