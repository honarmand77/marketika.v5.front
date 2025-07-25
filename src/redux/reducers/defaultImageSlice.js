import { createSlice } from '@reduxjs/toolkit';
import Defultimage from '../../assets/images/defult image.png';

const defaultImageSlice = createSlice({
  name: 'defaultImage',
  initialState: {
    src: Defultimage,
  },
  reducers: {
    setDefaultImage: (state, action) => {
      state.src = action.payload;
    },
  },
});

export const { setDefaultImage } = defaultImageSlice.actions;
export default defaultImageSlice.reducer;
