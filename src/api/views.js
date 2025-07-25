import api from "./index";

export const viewProduct = async (productId, userId, token) => {
  try {
    const response = await api.post(
      `views/add-view/${productId}`,
      { userId, productId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در ویو محصول:", error);
  }
};

export const getProductViewers = async (productId) => {
  try {
    const response = await api.get(`views/${productId}/viewers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching viewers:", error);
    return null;
  }
};