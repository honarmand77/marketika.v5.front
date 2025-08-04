import api from "./index";

// Get all brands
export const brandsData = async () => {
  try {
    const response = await api.get(`Brands`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Brands:", error);
    throw error;
  }
};

// Add new brands
export const addBrands = async (brandsData) => {
  try {
    if (brandsData instanceof FormData) {
      const response = await api.post("Brands/add", brandsData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      const response = await api.post("Brands/add", brandsData);
      return response.data;
    }
  } catch (error) {
    console.error("Error adding Brands:", error);
    throw error;
  }
};

// Edit existing Brands
export const editBrands = async (id, brandsData) => {
  try {
    if (brandsData instanceof FormData) {
      const response = await api.put(`Brands/edit/${id}`, brandsData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      const response = await api.put(`Brands/edit/${id}`, brandsData);
      return response.data;
    }
  } catch (error) {
    console.error("Error editing Brands:", error);
    throw error;
  }
};

// Delete Brands
export const deleteBrands = async (id) => {
  try {
    const response = await api.delete(`Brands/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Brands:", error);
    throw error;
  }
};

// Get single Brands by ID
export const getBrandsById = async (id) => {
  try {
    const response = await api.get(`Brands/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Brands:", error);
    throw error;
  }
};