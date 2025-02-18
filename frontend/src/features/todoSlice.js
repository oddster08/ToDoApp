import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [], // Initialize as an empty array
  reducers: {
    setTodos(state, action) {
      return action.payload; // Ensure the payload is an array
    },
    addTodo(state, action) {
      state.push(action.payload); // Add a new todo to the state
    },
    updateTodo(state, action) {
      return state.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      ); // Update a specific todo
    },
    deleteTodo(state, action) {
      return state.filter((todo) => todo._id !== action.payload); // Remove a specific todo
    },
  },
});

// Export the actions
export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

// Define and export the `fetchTodos` action
export const fetchTodos = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const res = await axios.get('http://localhost:5000/api/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Extract the `data` field from the response
    const todos = res.data.data;
    if (Array.isArray(todos)) {
      dispatch(setTodos(todos)); // Dispatch the `setTodos` action with the fetched todos
    } else {
      console.error('Expected an array of todos, but received:', todos);
    }
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
};

// Define and export the `createTodo` action
export const createTodo = (todoData) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const res = await axios.post('http://localhost:5000/api/todos', todoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addTodo(res.data.data)); // Dispatch the `addTodo` action with the new todo
  } catch (error) {
    console.error('Failed to create todo:', error);
  }
};

// Define and export the `updateTodoStatus` action
export const updateTodoStatus = (id, status) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const res = await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateTodo(res.data.data)); // Dispatch the `updateTodo` action with the updated todo
  } catch (error) {
    console.error('Failed to update todo status:', error);
  }
};

// Define and export the `removeTodo` action
export const removeTodo = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteTodo(id)); // Dispatch the `deleteTodo` action with the todo ID
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

// Export the reducer
export default todoSlice.reducer;
