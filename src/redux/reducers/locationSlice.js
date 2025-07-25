import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPath: '/', // مسیر پیش‌فرض
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.currentPath = action.payload; // به‌روزرسانی مسیر
    },
  },
});

export const { setPath } = locationSlice.actions;
export default locationSlice.reducer;
