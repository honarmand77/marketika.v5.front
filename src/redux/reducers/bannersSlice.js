import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bannerData } from '../../api/banners';

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bannerData();
      
      // اعتبارسنجی پاسخ سرور
      if (!response || !Array.isArray(response)) {
        throw new Error('داده‌های دریافتی معتبر نیستند');
      }
      
      return response; // فقط داده‌های مورد نیاز را برگردانید
    } catch (err) {
      // مدیریت خطاهای مختلف
      const error = {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      };
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  banners: [], 
  loading: false,
  error: null
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
        setBanners: (state, action) => {
          state.banners = action.payload;
        },
    // اضافه کردن reducer برای ریست خطا در صورت نیاز
    clearBannersError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null; // ریست خطا هنگام شروع درخواست جدید
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload; // استفاده از آرایه خالی به عنوان fallback
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 
                     action.error.message || 
                     'خطا در دریافت بنرها';
      });
  }
});

// اکشن‌های قابل dispatch
export const { setBanners, clearBannersError } = bannersSlice.actions;


export default bannersSlice.reducer;