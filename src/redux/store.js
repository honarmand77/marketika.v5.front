// store.js
import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './reducers/locationSlice';
import authReducer from './reducers/authSlice';
import productsReducer from './reducers/productsSlice'
import categoriesReducer from './reducers/categoriesSlice';
import subcategoriesReducer from './reducers/subcategoriesSlice';
import bannersReducer from './reducers/bannersSlice';
import cartReducer from './reducers/cartSlice';
export const store = configureStore({
  reducer: {
    location: locationReducer,
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    banners: bannersReducer,
    cart: cartReducer
  },
});