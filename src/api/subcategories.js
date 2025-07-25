import api from "./index";


export const subcategoriesData = async () => {
  try {
    const response = await api.get("subcategories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Add a new subcategory
 * @param {Object} subCategoryData - Subcategory data
 * @returns {Promise} - Response from the server
 */
export const addSubCategory = async (subCategoryData) => {
  try {
    const response = await api.post("subcategories/add", subCategoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding subcategory:", error);
    throw error;
  }
};

/**
 * Get subcategories by category ID
 * @param {string} categoryId - Parent category ID
 * @returns {Promise} - Array of subcategories
 */
export const getSubCategoriesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`subcategories/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories by category:", error);
    throw error;
  }
};

/**
 * Update a subcategory
 * @param {string} subCategoryId - ID of the subcategory to update
 * @param {Object} subCategoryData - Updated subcategory data
 * @returns {Promise} - Response from the server
 */
export const updateSubCategory = async (subCategoryId, subCategoryData) => {
  try {
    const response = await api.put(
      `subcategories/edit/${subCategoryId}`,
      subCategoryData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
};

/**
 * Delete a subcategory
 * @param {string} subCategoryId - ID of the subcategory to delete
 * @returns {Promise} - Response from the server
 */
export const deleteSubCategory = async (subCategoryId) => {
  try {
    const response = await api.delete(`subcategories/delete/${subCategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};