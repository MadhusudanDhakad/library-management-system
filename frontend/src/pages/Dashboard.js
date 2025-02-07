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
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <h1 className="text-2xl font-bold text-gray-800">Library Management System</h1>
      <p className="text-gray-600 mt-2">Welcome! Please register or log in to continue.</p>

        <div className="space-y-4">
          <div className="mt-6 space-y-4">
            {/* <p className="text-lg text-gray-600">New to the Library?</p> */}
            <button
              onClick={handleRegister}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Register!
            </button>
            {/* <p className="text-lg text-gray-600">Already have an account?</p> */}
            <button
              onClick={handleLogin}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-300"
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
