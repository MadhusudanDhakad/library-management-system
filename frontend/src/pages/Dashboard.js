import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRegister = async () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Welcome to the Library Management System!
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-lg text-gray-600">New to the Library?</p>
            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Register!
            </button>
          </div>

          <div>
            <p className="text-lg text-gray-600">Already have an account?</p>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
