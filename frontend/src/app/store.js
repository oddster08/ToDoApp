import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import todoReducer from '../features/todoSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});