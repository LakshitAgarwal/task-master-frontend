import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, User } from "lucide-react";
import signupGraphic from "../assets/signup-graphic.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const res = await fetch("https://task-master-backend-hghb.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || "Registration failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const result = await registerUser({
        firstName,
        lastName,
        username,
        password,
      });

      if (result.success) {
        toast.success("Registration successful! Redirecting to login...");
        // Add delay to allow toast to be seen before navigation
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-4 gap-5 md:gap-32">
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
          src={signupGraphic}
          alt="Login Graphic"
          className="w-96 md:w-full object-contain hidden md:block"
        />
      </div>

      {/* Registration Box */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full border border-gray-200">
        {/* Decorative Top Border */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-8 px-8">
          <h1 className="text-white text-3xl font-bold text-center">
            Create Account
          </h1>
          <p className="text-indigo-200 text-center mt-2">
            Join TaskMaster and boost your productivity
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-5">
            {/* Name Fields - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name Input */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                />
              </div>

              {/* Last Name Input */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

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
                placeholder="johndoe123"
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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      firstName &&
                      lastName &&
                      username &&
                      password &&
                      !loading
                    ) {
                      handleRegister();
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
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
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={
                !firstName || !lastName || !username || !password || loading
              }
              className={`cursor-pointer w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                !firstName || !lastName || !username || !password || loading
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
                  Creating Account...
                </>
              ) : (
                <>
                  <User className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 border-t border-gray-200 pt-6">
              <p className="text-gray-600">Already have an account?</p>
              <Link
                to="/login"
                className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
