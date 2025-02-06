import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });  // Ensure navigation resets state
    window.location.reload();  // Force a reload to reset state
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={role === "admin" ? "/admin-dashboard" : "/user-dashboard"} className="text-xl font-bold">Library Management</Link>
        <div className="flex space-x-4">
          {token && (
            <>
              <Link to="/books" className="hover:text-gray-100">Books</Link>
              <Link to="/transactions" className="hover:text-gray-100">Transactions</Link>
              <Link to={role === "admin" ? "/admin-dashboard" : "/user-dashboard" }className="hover:text-gray-400">Dashboard</Link>
              {role === "admin" && (
                <>
                  <Link to="/add-book" className="hover:text-gray-400">Add Book</Link>
                  <Link to="/reports" className="hover:text-gray-400">Reports</Link>
                </>
              )}
              <button onClick={handleLogout} className="hover:text-gray-100">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
