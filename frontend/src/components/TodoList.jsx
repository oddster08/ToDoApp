import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  if (!Array.isArray(todos)) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No todos available.</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">Your todo list is empty.</p>
        <p className="text-gray-400 text-sm mt-2">Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;