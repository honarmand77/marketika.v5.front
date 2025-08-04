import api from "./index";


  /**
   * ایجاد سفارش جدید
   * @param {Object} orderData - اطلاعات سفارش
   * @returns {Promise<Object>} - پاسخ سرور
   */
  export const createOrder = async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * دریافت سفارش بر اساس شناسه
   * @param {string} orderId - شناسه سفارش
   * @returns {Promise<Object>} - اطلاعات سفارش
   */

  export const getOrderById = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data

    } catch (error) {
      console.log(error)
    }
  }

  /**
   * دریافت سفارشات کاربر جاری
   * @returns {Promise<Object>} - لیست سفارشات کاربر
   */
  export const getUserOrders = async () => {
    try {
      const response = await api.get("/orders/myorders");
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * دریافت تمام سفارشات (فقط ادمین)
   * @returns {Promise<Object>} - لیست تمام سفارشات
   */
  export const getAllOrders = async () => {
    try {
      const response = await api.get("/orders");
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * به‌روزرسانی وضعیت سفارش (فقط ادمین)
   * @param {string} orderId - شناسه سفارش
   * @param {string} status - وضعیت جدید
   * @returns {Promise<Object>} - پاسخ سرور
   */
  export const updateOrderStatus = async (orderId ,status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * لغو سفارش
   * @param {string} orderId - شناسه سفارش
   * @returns {Promise<Object>} - پاسخ سرور
   */

  export const cancelOrder = async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * دریافت فاکتور سفارش
   * @param {string} orderId - شناسه سفارش
   * @returns {Promise<Object>} - فایل فاکتور
   */
   export const getOrderInvoice = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/invoice`, {
        responseType: 'blob' // برای دریافت فایل
      });
      return response.data
    } catch (error) {
      console.log(error);
    }
  }


 