import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-white text-xl font-bold hover:text-blue-100 transition duration-150"
          >
            TODO App
          </Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-150 shadow-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-white hover:text-blue-100 transition duration-150"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-150 shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;