import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={role === "admin" ? "/admin-dashboard" : "/user-dashboard"} className="text-xl font-bold">Library Management</Link>

         {/* Hamburger Menu Icon for Mobile */}
         {role && (
          <button onClick={toggleMenu} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
         )}

        {/* Navigation Links */}
        <div className={`md:flex md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          {token && (
            <>
              <Link to="/books" className="block md:inline hover:text-gray-100">Books</Link>
              <Link to="/transactions" className="block md:inline hover:text-gray-100">Transactions</Link>
              <Link to={role === "admin" ? "/admin-dashboard" : "/user-dashboard" }className="block md:inline hover:text-gray-400">Dashboard</Link>
              {role === "admin" && (
                <>
                  <Link to="/add-book" className="block md:inline hover:text-gray-400">Add Book</Link>
                  <Link to="/reports" className="block md:inline hover:text-gray-400">Reports</Link>
                </>
              )}
              <button onClick={handleLogout} className="block md:inline hover:text-gray-100">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
