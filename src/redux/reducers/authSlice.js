import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { 
  sendOtpRequest, 
  loginRequest, 
  registerRequest,
  fetchUserData 
} from "../../api/auth";

// Async Thunks
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendOtpRequest(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'خطا در ارسال کد تأیید'
      );
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, otp }, { rejectWithValue }) => {
    try {
      const response = await loginRequest(email, password, otp);
      return {
        user: response.data.userData,
        token: response.data.token
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'خطا در ورود'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, username, phone, password, role }, { rejectWithValue }) => {
    try {
      const response = await registerRequest(email, username, phone, password, role);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'خطا در ثبت‌نام'
      );
    }
  }
);

export const loadUserFromCookies = createAsyncThunk(
  'auth/loadUserFromCookies',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const userCookie = Cookies.get("authUser");
      const roleCookie = Cookies.get("authRole");
    
      if (token && userCookie && roleCookie) {
        const user = JSON.parse(userCookie);
        return { token, user, role: roleCookie ,wishlist:user?.wishlist};
      }
      return rejectWithValue("No user data in cookies");
    } catch (error) {
      ['authToken', 'authUser', 'authRole'].forEach(name => 
        Cookies.remove(name, { path: '/' })
      );
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  token: null,
  user: null,
  role: null,
  wishlist: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const token = Cookies.get("authToken");
      const userCookie = Cookies.get("authUser");
      const roleCookie = Cookies.get("authRole");
    
      if (token && userCookie && roleCookie) {
        try {
          const user = JSON.parse(userCookie);
          state.token = token;
          state.user = user;
          state.role = roleCookie;
          state.wishlist = user?.wishlist;
          state.isAuthenticated = true;
        } catch (error) {
          console.error("Error parsing user data:", error);
          ['authToken', 'authUser', 'authRole'].forEach(name => 
            Cookies.remove(name, { path: '/' })
          );
        }
      }
    },
    updateUser: (state, action) => {
      if (action.payload) {
        state.user = { ...state.user, ...action.payload };
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        Cookies.set("authUser", JSON.stringify(state.user), { 
          expires: expirationDate,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.otpSent = false;
      
      ['authToken', 'authUser', 'authRole'].forEach(name => 
        Cookies.remove(name, { path: '/' })
      );
    },
    resetAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpSent = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        
        if (token && user) {
          state.token = token;
          state.user = user;
          state.role = user.role;
          state.isAuthenticated = true;
          
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          
          const cookieOptions = {
            expires: expirationDate,
            path: '/',
            secure: window.location.protocol === 'https:',
            sameSite: 'Lax'
          };
          
          Cookies.set("authToken", token, cookieOptions);
          Cookies.set("authUser", JSON.stringify(user), cookieOptions);
          Cookies.set("authRole", user.role, cookieOptions);
        }
        
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserFromCookies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFromCookies.fulfilled, (state, action) => {
        const { token, user, role } = action.payload;
        state.token = token;
        state.user = user;
        state.role = role;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUserFromCookies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })}
});

export const { 
  loadUserFromStorage,
  logout, 
  updateUser, 
  resetAuthError 
} = authSlice.actions;

export default authSlice.reducer;