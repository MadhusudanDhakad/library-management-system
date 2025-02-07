import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import AddBook from "./components/AddBook";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Membership from "./pages/Membership"; 
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // const token = localStorage.getItem("token");
  // const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;
  const [role, setRole] = useState(null);
  const location = useLocation();
  const showNavbar = !["/login", "/register"].includes(location.pathname);
  const navigate = useNavigate();

  // Check authentication when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userRole = JSON.parse(atob(token.split(".")[1])).role;
        setRole(userRole);
      } catch (error) {
        console.error("Invalid token: ", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setRole(userRole);
      navigate(userRole === "admin" ? "/admin-dashboard" : "/user-dashbord");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null);
    navigate("/");  // Redirect to Dashboard after logout
  };

  // Auto logout when the browser/tab is closed
  useEffect(() => {
    const handleLogoutOnClose = () => {
      localStorage.removeItem("token");
      setRole(null);
    };
    window.addEventListener("beforeunload", handleLogoutOnClose);
    
    return () => {
      window.removeEventListener("beforeunload", handleLogoutOnClose);
    };
  }, []);

    return (
    <>
      <ToastContainer />
      {showNavbar && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<AddUser />} />
        
        {/* Role-based protected routes */}
        {role === "user" && (
          <>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/memberships" element={<Membership />} />
          </>
        )}

        {role === "admin" && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/books" element={<Books />} />
          </>
        )}

        {/* Redirect to dashboard based on role */}
        <Route path="*" element={<Navigate to={role ? (role === "admin" ? "/admin-dashboard" : "/user-dashboard") : "/"} />} />
      </Routes>
    </>
  );

  // return (
  //   <>
  //     <ToastContainer />
  //     {/* <Navbar onLogout={handleLogout} /> */}
  //     {showNavbar && <Navbar onLogout={handleLogout} />}

  //     {/* Show Dashboard only if no one is logged in */}
  //     {!role ? (
  //       <>
  //         {/* <Dashboard /> */}
  //         <Routes>
  //           <Route path="/" element={<Dashboard />} />
  //           <Route path="/login" element={<Login onLogin={handleLogin} />} />
  //           <Route path="/register" element={<AddUser />} />
  //           <Route path="*" element={<Navigate to="/" />} />
  //         </Routes>
  //       </>
  //     ) : (
  //       <>
  //         <Routes>
  //           <Route path="/" element={<AddUser />} />
  //           <Route path="/books" element={<Books />} />
  //           <Route path="/transactions" element={<Transactions />} />
  //           <Route path="/membership" element={<Membership />} />

  //           {/* Role-based access */}
  //           {/* <Route path="/login" element={<Login />} /> */}
  //           <Route
  //             path="/user-dashboard"
  //             element={role === "user" ? <UserDashboard /> : <Navigate to="/books" />}
  //           />
  //           <Route 
  //             path="/admin-dashboard" 
  //             element={role === "admin" ? <AdminDashboard /> : <Navigate to="/books" />} 
  //           />
  //           <Route
  //             path="/add-book"
  //             element={role === "admin" ? <AddBook /> : <Navigate to="/books" />}
  //           />
  //           <Route
  //             path="/reports"
  //             element={role === "admin" ? <Reports /> : <Navigate to="/books" />}
  //           />

  //           {/* Redirect unknown routes */}
  //           <Route path="*" element={<Navigate to="/books" />} />
  //         </Routes>
  //       </>
  //     )}
  //   </>
  // );
};

export default App;
