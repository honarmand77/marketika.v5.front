import api from "./index"; // استفاده از تنظیمات axios از فایل index

/**
 * دریافت نظرات یک محصول
 * @param {string} productId - آی‌دی محصول
 * @returns {Promise<Array>} - لیست نظرات
 */
export const fetchReviews = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * ثبت نظر جدید برای محصول
 * @param {string} productId - آی‌دی محصول
 * @param {Object} reviewData - داده‌های نظر شامل rating و comment
 * @param {string} token - توکن احراز هویت
 * @returns {Promise<Object>} - نظر ثبت شده
 */
export const submitReview = async (productId, reviewData, token) => {
  try {
    const response = await api.post(
      `/products/${productId}/reviews`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};