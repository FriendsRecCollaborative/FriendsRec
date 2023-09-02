import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

type UserRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

interface UserLogin {
  username: string;
  password: string;
}

interface User {
  email: string;
  fullName: string;
  joined: string;
  user_id: number;
  username: string;
}

const userString = localStorage.getItem('user');
const user: User | null = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const register = createAsyncThunk('auth/register', async (userData: UserRegister) => {
  try {
    const response = await authService.register(userData);
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const login = createAsyncThunk('auth/login', async (userData: UserLogin) => {
  try {
    const response = await authService.login(userData);
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await authService.logout();
    return response;
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
