import api from "./index";

export const sendOtpRequest = (email) => {
  return api.post(`auth/send-otp`, { email },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
};

export const loginRequest = (email, password, otp) => {
  return api.post(`auth/login`, { email, password, otp }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
};

export const registerRequest = (email, username, phone, password, role) => {
  return api.post(`auth/register`, {
    email,
    username,
    phone,
    password,
    role,
  }, {
      headers: {
        'Content-Type': 'application/json',
      }
  });
};

export const fetchUserData = async (token) => {
  try {
    const response = await api.get("user/profile", {
      headers: { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("خطا در دریافت اطلاعات کاربر:", error);
  }
};