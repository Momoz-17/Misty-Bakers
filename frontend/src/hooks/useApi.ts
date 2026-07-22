import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Small wrapper that automatically attaches the Firebase ID token
// to every authenticated request against our Express backend.
export const useApi = () => {
  const { getToken } = useAuth();

  const request = async (path: string, options: RequestInit = {}) => {
    const token = await getToken();

    // IMPORTANT: when sending FormData (e.g. cake image uploads), do NOT set
    // Content-Type manually — the browser needs to generate its own
    // multipart/form-data boundary. Setting it to application/json here was
    // breaking every image upload request (backend saw an empty/garbled
    // body and returned 400 Bad Request).
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    };

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(err.message || "Request failed");
    }
    return res.json();
  };

  return { request };
};