import React, { useEffect, useState } from "react";
import { Menu, X, CheckSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/getUser";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Use this effect to check localStorage on mount and set initial state
  useEffect(() => {
    const checkUserAuth = () => {
      const userCheck = getUser();
      setUser(userCheck);
    };

    // Check on initial load
    checkUserAuth();

    // Set up interval to periodically check for auth changes
    setInterval(checkUserAuth, 1000);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("toDoAppUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-50 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={getUser() ? "/toDo" : "/"}>
              <div className="flex-shrink-0 flex items-center">
                <CheckSquare className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  TaskMaster
                </span>
              </div>
            </Link>
          </div>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user.firstName}</span>
              <button
                onClick={handleLogout}
                className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <button className="px-4 cursor-pointer py-2 text-indigo-600 hover:text-indigo-800 rounded-md font-medium">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 cursor-pointer py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div className="block px-3 py-2 text-gray-700">
                  Hello, {user.firstName}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="block w-full text-left px-3 py-2 text-indigo-600 hover:bg-gray-50 rounded-md font-medium">
                    Log In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="block w-full text-left px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
