import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, User, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };
  
  return (
    <nav className="bg-black border-b border-red-600 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <img 
            src="/Red and White Simple Food Logo (1).png" 
            alt="RedPuppet" 
            className="h-16 w-auto"
          />
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <Link 
                to="/feed" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/feed') ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Feed</span>
              </Link>
              <Link 
                to="/profile" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/profile') ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <Link 
                to="/login" 
                className="text-white hover:text-red-400 transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;