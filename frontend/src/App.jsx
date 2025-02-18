import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="*" element={<h1 className="text-center mt-8 text-2xl font-semibold">404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;