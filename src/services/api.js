
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: saved demo/backend token ho toh attach karo.
api.interceptors.request.use(
  (config) => {
    // Demo admin token, agar available ho.
    const adminToken = localStorage.getItem("adminToken");

    // Backend customer login connect hone par customer token use kar sakte ho.
    const customerToken = localStorage.getItem("accessToken");

    const token = adminToken || customerToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: API errors ko consistent format mein handle karo.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.message = "Server response mein der ho rahi hai. Dobara try karo.";
    } else if (!error.response) {
      error.message =
        "Backend se connection nahi ho raha. Server aur API URL check karo.";
    } else {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Session invalid ya expire ho sakta hai.");
      } else if (status === 403) {
        console.warn("Is action ke liye permission nahi hai.");
      } else if (status >= 500) {
        console.error("Backend server error:", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
