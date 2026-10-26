
import api from "./api";

// Saare products fetch karo.
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};

// Ek product ki details fetch karo.
export const getProductById = async (id) => {
  if (!id) throw new Error("Product ID required.");

  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Category ke hisaab se products fetch karo.
export const getProductsByCategory = async (category) => {
  if (!category) throw new Error("Category required.");

  const response = await api.get("/products", {
    params: { category },
  });

  return response.data;
};

// Product search karo.
export const searchProducts = async (query) => {
  const response = await api.get("/products", {
    params: { search: query },
  });

  return response.data;
};

// Admin: naya product create karo.
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Admin: existing product update karo.
export const updateProduct = async (id, productData) => {
  if (!id) throw new Error("Product ID required.");

  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Admin: product delete karo.
export const deleteProduct = async (id) => {
  if (!id) throw new Error("Product ID required.");

  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Admin: product stock update karo.
export const updateProductStock = async (id, stock) => {
  if (!id) throw new Error("Product ID required.");

  const response = await api.patch(`/products/${id}/stock`, { stock });
  return response.data;
};

export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
};
