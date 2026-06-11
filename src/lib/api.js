// src/lib/api.js

/**
 * Returns the API base URL for both client and server contexts.
 *
 * - Server-side (SSR): relative URLs don't resolve, so we use API_URL env var
 *   which points directly to Apache/PHP on the same host (http://localhost).
 * - Client-side production: empty string = same-origin (PHP API at /api/).
 * - Client-side local dev: NEXT_PUBLIC_API_URL (e.g. http://127.0.0.1:8000).
 */
export const getApiBaseUrl = () => {
  // Server-side (SSR / generateStaticParams / generateMetadata)
  if (typeof window === "undefined") {
    return process.env.API_URL || "http://localhost";
  }
  // Client-side local dev
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  if (isLocalhost) {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  // Client-side production — same origin
  return "";
};
