
import api from "./api";

// Customer: naya order place karo.
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Customer: apne saare orders fetch karo.
export const getMyOrders = async (params = {}) => {
  const response = await api.get("/orders/my-orders", { params });
  return response.data;
};

// Customer: ek order ki details fetch karo.
export const getOrderById = async (orderId) => {
  if (!orderId) {
    throw new Error("Order ID required.");
  }

  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// Customer: order cancel karo.
export const cancelOrder = async (orderId, reason = "") => {
  if (!orderId) {
    throw new Error("Order ID required.");
  }

  const response = await api.patch(`/orders/${orderId}/cancel`, {
    reason,
  });

  return response.data;
};

// Admin: saare customer orders fetch karo.
export const getAllOrders = async (params = {}) => {
  const response = await api.get("/admin/orders", { params });
  return response.data;
};

// Admin: order status update karo.
export const updateOrderStatus = async (orderId, status) => {
  if (!orderId || !status) {
    throw new Error("Order ID aur status required hain.");
  }

  const response = await api.patch(`/admin/orders/${orderId}/status`, {
    status,
  });

  return response.data;
};

export default {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
