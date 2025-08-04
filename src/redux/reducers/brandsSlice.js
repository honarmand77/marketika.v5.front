import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { brandsData } from '../../api/brands';

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await brandsData();
      
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
  brands: [], 
  loading: false,
  error: null
};

const BrandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
        setBrands: (state, action) => {
          state.brands = action.payload;
        },
    // اضافه کردن reducer برای ریست خطا در صورت نیاز
    clearBrandsError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null; // ریست خطا هنگام شروع درخواست جدید
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload; // استفاده از آرایه خالی به عنوان fallback
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 
                     action.error.message || 
                     'خطا در دریافت بنرها';
      });
  }
});

// اکشن‌های قابل dispatch
export const { setBrands, clearBrandsError } = BrandsSlice.actions;


export default BrandsSlice.reducer;