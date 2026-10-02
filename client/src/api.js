import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Expired or invalid token: log the admin out so the edit buttons disappear
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const sentToken = err.config?.headers?.Authorization;
    if (err.response?.status === 401 && sentToken && !err.config.url.includes("/login")) {
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(err);
  }
);

// "/uploads/pic.jpg" -> "http://localhost:5000/uploads/pic.jpg"
export const fileUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL.replace(/\/api\/?$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default api;
