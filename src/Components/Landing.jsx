import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import landingGraphic from "../assets/landing-graphic.png";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Organize your life,{" "}
              <span className="text-indigo-600">one task at a time</span>
            </h1>

            <p className="text-lg text-gray-600">
              TaskMaster helps you manage your tasks efficiently, so you can
              focus on what truly matters. Stay organized, boost productivity,
              and achieve more every day.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" />
                <p className="ml-3 text-gray-600">
                  Simple and intuitive task management
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" />
                <p className="ml-3 text-gray-600">
                  Access from any device, anytime
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" />
                <p className="ml-3 text-gray-600">
                  Never miss a deadline again
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <button className="cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link to="/login">
                <button className="cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src={landingGraphic}
              alt="TaskMaster todo application"
              className="w-full h-full object-contain rounded-lg scale-125 hidden md:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
