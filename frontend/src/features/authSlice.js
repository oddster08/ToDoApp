import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Set token in axios headers if available
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token || null,
    isAuthenticated: !!token,
    error: null,  // Store error messages
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
    },
    loginFailure(state, action) {
      state.error = action.payload; // Store error message
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});

// Export actions
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// **Login Action**
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    console.error('Login failed:', error);
  }
};

// **Register Action**
export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });

    dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Registration failed'));
    console.error('Registration failed:', error);
  }
};

// **Logout Action**
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export default authSlice.reducer;
