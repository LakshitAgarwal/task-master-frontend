import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import loginGraphic from "../assets/login-graphic.png";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (userData) => {
    /**
     * api calls to your backend cab be sent using 2 ways:
     * Axios: easier way u dont have to specify much stuff just calling.
     * Fetch: this is a but typical way in this u have to specify alot of stuff.
     */

    // I'll do the login Auth using Fetch and registration Auth using Axios
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        // Only store in localStorage if login was successful
        localStorage.setItem("toDoAppUser", JSON.stringify(data));
        return { success: true, data };
      } else {
        // Return error message from server
        return { success: false, error: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await loginUser({ username, password });

      if (result.success) {
        toast.success("Login successful!");

        // Delay navigation and stop loading after 1.5 seconds
        setTimeout(() => {
          setLoading(false); // stop spinner
          navigate("/toDo");
        }, 1000);
      } else {
        toast.error(
          result.error || "Login failed. Please check your credentials."
        );
        setLoading(false); // stop spinner on failure
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
      setLoading(false); // stop spinner on error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center mt-24 md:mt-0 md:justify-center bg-white px-4 md:gap-32">
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Image */}
      <div className="max-w-lg w-full flex justify-center">
        <img
          src={loginGraphic}
          alt="Login Graphic"
          className="w-96 md:w-full object-contain hidden md:block"
        />
      </div>

      {/* Login Box */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full border border-gray-200">
        {/* Decorative Top Border */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-8 px-8">
          <h1 className="text-white text-3xl font-bold text-center">
            Welcome Back
          </h1>
          <p className="text-indigo-200 text-center mt-2">
            Sign in to continue to TaskMaster
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Username Input */}
            <div className="group">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && username && password && !loading) {
                      handleLogin();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={!username || !password || loading}
              className={`w-full cursor-pointer py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                !username || !password || loading
                  ? "bg-indigo-300 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={20}
                    color="inherit"
                    className="mr-2"
                  />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center mt-8 border-t border-gray-200 pt-6">
              <p className="text-gray-600">New to TaskMaster?</p>
              <Link
                to="/register"
                className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
