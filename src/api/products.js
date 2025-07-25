import api from "./index";

export const fetchProducts = async () => {
  try {
    const response = await api.get(`products`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const likeProduct = async (productId, userId) => {
  try {
    const response = await api.patch(
      `products/like/${productId}`,
      { userId,productId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در لایک محصول:", error);
  }
};

export const unlikeProduct = async (productId, userId) => {
  try {
    const response = await api.patch(`products/unlike/${productId}`, { userId ,productId},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error unliking product:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await api.post("products/add", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const fetchProductsByAdmin = async (adminId) => {
  try {
    const response = await api.get(`products/admin/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by admin:", error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    // در واقعیت اینجا به بکند متصل می‌شوید
    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت نتایج جستجو');
    }
    
    return data.products;
  } catch (error) {
    console.error('Error in searchProducts:', error);
    throw error;
  }
};


/**
 * Edit an existing product
 * @param {string} productId - ID of the product to edit
 * @param {FormData} productData - Updated product data (can include images)
 * @returns {Promise} - Response from the server
 */
export const editProduct = async (productId, productData) => {
  try {
    const response = await api.put(`products/edit/${productId}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

/**
 * Delete a product
 * @param {string} productId - ID of the product to delete
 * @param {string} adminId - ID of the admin performing the deletion
 * @returns {Promise} - Response from the server
 */
export const deleteProduct = async (productId, adminId) => {
  try {
    const response = await api.delete(`products/delete/${productId}`, {
      data: { adminId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * Get product details for editing
 * @param {string} productId - ID of the product to fetch
 * @returns {Promise} - Product data
 */
export const getProductForEdit = async (productId) => {
  try {
    const response = await api.get(`products/edit/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product for edit:", error);
    throw error;
  }
};