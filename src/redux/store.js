import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './reducers/locationSlice';
import authReducer from './reducers/authSlice';
import productsReducer from './reducers/productsSlice';
import categoriesReducer from './reducers/categoriesSlice';
import subcategoriesReducer from './reducers/subcategoriesSlice';
import bannersReducer from './reducers/bannersSlice';
import cartReducer from './reducers/cartSlice';
import brandsReducer from './reducers/brandsSlice';

// Combine all reducers into a single root reducer (optional but cleaner)
const rootReducer = {
  location: locationReducer,
  auth: authReducer,
  products: productsReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  banners: bannersReducer,
  cart: cartReducer,
  brands: brandsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

// Enable Webpack Hot Module Replacement for Redux reducers
if (process.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept(
    [
      './reducers/locationSlice',
      './reducers/authSlice',
      './reducers/productsSlice',
      './reducers/categoriesSlice',
      './reducers/subcategoriesSlice',
      './reducers/bannersSlice',
      './reducers/cartSlice',
      './reducers/brandsSlice',
    ],
    () => {
      // Re-import all reducers and update the store
      const newRootReducer = {
        location: require('./reducers/locationSlice').default,
        auth: require('./reducers/authSlice').default,
        products: require('./reducers/productsSlice').default,
        categories: require('./reducers/categoriesSlice').default,
        subcategories: require('./reducers/subcategoriesSlice').default,
        banners: require('./reducers/bannersSlice').default,
        cart: require('./reducers/cartSlice').default,
        brands: require('./reducers/brandsSlice').default,
      };
      store.replaceReducer(configureStore({ reducer: newRootReducer }).reducer);
    }
  );
}