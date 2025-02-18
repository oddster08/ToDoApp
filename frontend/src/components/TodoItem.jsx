import { useDispatch } from 'react-redux';
import { updateTodoStatus, removeTodo } from '../features/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(updateTodoStatus(todo._id, e.target.value));
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo._id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{todo.title}</h3>
          <p className="text-gray-600 mb-2">{todo.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(todo.status)}`}>
          {todo.status}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        Due: {new Date(todo.deadline).toLocaleString()}
      </p>
      
      <div className="flex items-center justify-between">
        <select
          value={todo.status}
          onChange={handleStatusChange}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition duration-150"
        >
          <option value="ACTIVE">Active</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETE">Complete</option>
        </select>
        
        <button 
          onClick={handleDelete} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;