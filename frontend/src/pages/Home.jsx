import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../features/todoSlice';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFilter from '../components/TodoFilter';

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { token } = useSelector((state) => state.auth); // Check if user is logged in
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Fetch todos only if user is authenticated
  useEffect(() => {
    if (token) {
      dispatch(fetchTodos());
    }
  }, [dispatch, token]);

  // Update filteredTodos whenever todos change
  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  // Handle filtering by status
  const handleFilter = (status) => {
    if (!status) {
      setFilteredTodos(todos); // Show all todos if no status is selected
    } else {
      setFilteredTodos(todos.filter((todo) => todo.status === status));
    }
  };

  // Handle searching by title or description
  const handleSearch = (query) => {
    const filtered = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase()) ||
        todo.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  // Handle sorting by deadline or status
  const handleSort = (criteria) => {
    const sorted = [...filteredTodos];
    if (criteria === 'deadline') {
      sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (criteria === 'status') {
      sorted.sort((a, b) => a.status.localeCompare(b.status));
    }
    setFilteredTodos(sorted);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      {token ? (
        <>
          <TodoForm />
          <TodoFilter onFilter={handleFilter} onSearch={handleSearch} onSort={handleSort} />
          <TodoList todos={filteredTodos} />
        </>
      ) : (
        <p className="text-red-500">Please log in to view your todos.</p>
      )}
    </div>
  );
};

export default Home;
