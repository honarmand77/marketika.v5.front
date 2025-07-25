import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subcategoriesData } from '../../api/subcategories';

export const fetchSubcategories = createAsyncThunk(
  'subcategories/fetchSubcategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await subcategoriesData();
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: {
    subcategories: [],
    loading: false,
    error: null
  },
  reducers: {
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  }
});

export const selectAllSubcategories = (state) => state.subcategories.subcategories;
export const selectSubcategoriesStatus = (state) => state.subcategories.status;
export const selectSubcategoriesError = (state) => state.subcategories.error;

export const { setSubcategories } = subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;