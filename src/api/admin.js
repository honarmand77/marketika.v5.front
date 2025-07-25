import api from "./index";

export const addAdmin = async (adminData) => {
  try {
    const response = await api.post("admin/add", adminData);
    return response.data;
  } catch (error) {
    console.error("Error adding admin:", error);
    throw error;
  }
};