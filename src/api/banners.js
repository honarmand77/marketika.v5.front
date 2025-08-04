import api from "./index";

// Get all banners
export const bannerData = async () => {
  try {
    const response = await api.get(`banners`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

// Add new banner
export const addBanner = async (bannerData) => {
  try {
    if (bannerData) {
      const response = await api.post("banners/add", bannerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      const response = await api.post("banners/add", bannerData);
      return response.data;
    }
  } catch (error) {
    console.error("Error adding banner:", error);
    throw error;
  }
};

// Edit existing banner
export const editBanner = async (id, bannerData) => {
  try {
    if (bannerData instanceof FormData) {
      const response = await api.put(`banners/edit/${id}`, bannerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      const response = await api.put(`banners/edit/${id}`, bannerData);
      return response.data;
    }
  } catch (error) {
    console.error("Error editing banner:", error);
    throw error;
  }
};

// Delete banner
export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`banners/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};

// Get single banner by ID
export const getBannerById = async (id) => {
  try {
    const response = await api.get(`banners/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error;
  }
};