import axios from "axios";
import Cookies from "js-cookie";
import { encryptData, decryptData } from "../utils/encryption";
export const Api_Url = "https://marketika-v5-back.onrender.com"
const API_BASE_URL = `${Api_Url}/api/`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",

  },
});

// افزودن توکن به درخواست‌ها در صورت وجود
api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// رمزگشایی پاسخ‌های GET
api.interceptors.response.use((response) => {
  if (response.data) {
    response.data = decryptData(response.data);
  }
  return response;
});


export default api;
