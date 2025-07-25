import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likeProduct, unlikeProduct, fetchProducts as fetchProductsAPI } from '../../api/products';

const initialState = {
  products: [],
  loading: false,
  loadingStates: {},
  error: null,
};

// Action برای دریافت محصولات
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProductsAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response || error.message);
    }
  }
);

// Action برای لایک/آنلایک محصولات
export const toggleLike = createAsyncThunk(
  'products/toggleLike',
  async ({ productId, userId, currentLikes, isCurrentlyLiked }, { rejectWithValue }) => {
    try {
      let response;
      
      if (isCurrentlyLiked) {
        response = await unlikeProduct(productId, userId).catch(err => {
          if (err.response?.status === 400) {
            return { data: { success: true, likes: currentLikes.filter(id => id !== userId) } };
          }
          throw err;
        });
      } else {
        response = await likeProduct(productId, userId);
      }
      
      return {
        productId,
        likes: response?.likes || currentLikes,
        isLiked: !isCurrentlyLiked
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // برای تنظیم دستی محصولات
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // ریست کردن خطاها
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // حالت‌های fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // حالت‌های toggleLike
      .addCase(toggleLike.pending, (state, action) => {
        const { productId } = action.meta.arg;
        state.loadingStates = {
          ...state.loadingStates,
          [productId]: true
        };
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { productId, likes, isLiked } = action.payload;
        
        state.loadingStates[productId] = false;
        
        // استفاده از map برای ایجاد آرایه جدید با تغییرات
        state.products = state.products.map(product => 
          product._id === productId 
            ? { ...product, likes, isLiked } 
            : product
        );
      })
      .addCase(toggleLike.rejected, (state, action) => {
        const { productId } = action.meta.arg;
        state.loadingStates = {
          ...state.loadingStates,
          [productId]: false
        };
        state.error = action.payload;
      });
  }
});

export const { setProducts, clearError } = productsSlice.actions;
export default productsSlice.reducer;