import api from "./index";

export const fetchOrderHistoryForAdmin = async (adminId) => {
  try {
    const response = await api.get(`orders/history/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const fetchPendingOrdersForAdmin = async (adminId) => {
  try {
    const response = await api.get(`orders/pending/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    throw error;
  }
};