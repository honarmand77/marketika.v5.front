import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
} from '../../api/cart';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  itemStatus: {},
  lastUpdated: null,
  cartLoadingStates: {},
  totalPrice: 0
};

const handleApiError = (error, rejectWithValue) => {
  const errorMessage = error.response?.data?.message || error.message || 'خطا در عملیات سبد خرید';
  console.error('Cart Error:', errorMessage);
  return rejectWithValue(errorMessage);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: () => initialState,
    setItemLoading: (state, action) => {
      const { productId, isLoading } = action.payload;
      if (isLoading) {
        state.cartLoadingStates[productId] = true;
      } else {
        delete state.cartLoadingStates[productId];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload?.items || [];
        state.totalPrice = calculateTotalPrice(state.items);
        state.error = null;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'خطای ناشناخته در دریافت سبد خرید';
      })
      
      // Add Item
      .addCase(addItemToCart.pending, (state, action) => {
        const { productId } = action.meta.arg;
        state.cartLoadingStates[productId] = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
  const { productId, quantity } = action.meta.arg;
        const newItem = action.payload;
        
  const existingIndex = state.items.findIndex(
    item => item.product._id === productId
  );
  
  if (existingIndex >= 0) {
    // افزایش یا کاهش quantity بر اساس مقدار ارسالی
    state.items[existingIndex].quantity += quantity;
    
    // اطمینان از اینکه quantity حداقل 1 باشد
    if (state.items[existingIndex].quantity < 1) {
      state.items[existingIndex].quantity = 1;
    }
  }
        
        state.totalPrice = calculateTotalPrice(state.items);
        state.lastUpdated = Date.now();
        delete state.cartLoadingStates[productId];
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        const { productId } = action.meta.arg;
        state.error = action.payload;
        delete state.cartLoadingStates[productId];
      })
      
      // Update Quantity
      .addCase(updateItemQuantity.pending, (state, action) => {
        const { itemId } = action.meta.arg;
        state.itemStatus[itemId] = 'loading';
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const { itemId } = action.meta.arg;
        const updatedItem = action.payload;
        
        state.items = state.items.map(item => 
          item._id === itemId ? updatedItem : item
        );
        
        state.totalPrice = calculateTotalPrice(state.items);
        state.lastUpdated = Date.now();
        delete state.itemStatus[itemId];
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        const { itemId } = action.meta.arg;
        state.error = action.payload;
        delete state.itemStatus[itemId];
      })
      
      // Remove Item
      .addCase(removeItemFromCart.pending, (state, action) => {
        const itemId = action.meta.arg;
        state.itemStatus[itemId] = 'loading';
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter(item => item._id !== itemId);
        state.totalPrice = calculateTotalPrice(state.items);
        state.lastUpdated = Date.now();
        delete state.itemStatus[itemId];
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        const itemId = action.meta.arg;
        state.error = action.payload;
        delete state.itemStatus[itemId];
      })
      
      // Clear Cart
      .addCase(clearUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.items = [];
        state.totalPrice = 0;
        state.status = 'succeeded';
        state.lastUpdated = Date.now();
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = item.priceAtAddition || item.product?.price || 0;
    return total + (itemPrice * item.quantity);
  }, 0);
};

// Async Thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await getCart(auth.user.id);
      return response;
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await addToCart(
        productId, 
        quantity, 
        auth.user.id,
        auth.token
      );
      return response;
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItem',
  async ({ itemId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await updateCartItemQuantity(
        itemId, 
        quantity, 
        auth.token
      );
      return response;
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await removeFromCart(itemId, auth.token);
      return itemId;
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

export const clearUserCart = createAsyncThunk(
  'cart/clearCart',
  async ({userId}, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await clearCart(auth.token , userId);
      return true;
    } catch (error) {
      return handleApiError(error, rejectWithValue);
    }
  }
);

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectCartLastUpdated = (state) => state.cart.lastUpdated;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartLoadingStates = (state) => state.cart.cartLoadingStates;
export const selectItemStatus = (state) => state.cart.itemStatus;

export const { resetCart, setItemLoading } = cartSlice.actions;
export default cartSlice.reducer;