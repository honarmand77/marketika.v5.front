import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {categoryData} from '../../api/categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryData();
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null
  },
  reducers: {
            setcategories: (state, action) => {
              state.categories = action.payload;
            },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  }
});

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;