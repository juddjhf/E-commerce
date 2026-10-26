
import api from "./api";

// Customer registration
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Customer login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Current logged-in user's profile
export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Update customer profile
export const updateProfile = async (profileData) => {
  const response = await api.put("/auth/profile", profileData);
  return response.data;
};

// Customer logout
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  if (!token) {
    throw new Error("Password reset token required.");
  }

  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });

  return response.data;
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
};
