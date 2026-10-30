/**
 * Single source of truth for the API base URL.
 *
 * Resolved at runtime from VITE_API_URL when provided, otherwise falls back to
 * the historical hard-coded hosts. No `window` access happens at module scope
 * so this stays safe under jsdom/vitest and any non-browser renderer.
 */
const DEFAULT_PRODUCTION_URL = "https://portfolio-backend-galc.onrender.com";
const DEFAULT_DEVELOPMENT_URL = "http://localhost:4000";

const configuredUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL = (
  configuredUrl ||
  (import.meta.env.PROD ? DEFAULT_PRODUCTION_URL : DEFAULT_DEVELOPMENT_URL)
).replace(/\/+$/, "");
