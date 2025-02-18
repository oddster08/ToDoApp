const TodoFilter = ({ onFilter, onSearch, onSort }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title or description"
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150"
        />
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition duration-150"
        >
          <option value="">All Tasks</option>
          <option value="ACTIVE">Active</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETE">Complete</option>
          <option value="EXPIRED">Expired</option>
        </select>
        <select
          onChange={(e) => onSort(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition duration-150"
        >
          <option value="">Sort By</option>
          <option value="deadline">Deadline</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilter;