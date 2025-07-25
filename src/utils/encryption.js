import CryptoJS from "crypto-js";

const SECRET_KEY = "@M2589632110h@"; // کلید رمزنگاری خود را اینجا قرار دهید

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};