// src/services/cartService.js
import api from './index';

export const getCart = async (userId) => {
  try {
    const response = await api.get(`cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'خطا در دریافت سبد خرید');
  }
};

export const addToCart = async (productId, quantity, userId, token) => {
  try {
    const response = await api.post(
      'cart/add',
      { productId, quantity, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'خطا در افزودن به سبد خرید');
  }
};

export const updateCartItemQuantity = async (itemId, quantity, token) => {
  try {
    const response = await api.put(
      `cart/items/${itemId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'خطا در به‌روزرسانی سبد خرید');
  }
};

export const removeFromCart = async (itemId, token) => {
  try {
    const response = await api.delete(`/cart/items/${itemId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'خطا در حذف از سبد خرید');
  }
};

export const clearCart = async (token , userId) => {
  try {
    const response = await api.delete(`/cart/${userId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'خطا در خالی کردن سبد خرید');
  }
};

// Wishlist services (kept separate as they're different domain)
export const wishlistService = {
  addToWishlist: async (productId, token) => {
    try {
      const response = await api.post(
        "wishlist/add",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  },

  removeFromWishlist: async (productId, token) => {
    try {
      const response = await api.delete(`/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  },

  checkWishlistStatus: async (productId, token) => {
    try {
      const response = await api.get(`/wishlist/check/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.isInWishlist;
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      return false;
    }
  }
};