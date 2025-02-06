import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", values);
      localStorage.setItem("token", res.data.token);
      // navigate(res.data.role === "admin" ? "/admin-dashboard" : "/books");
      onLogin(); // Update role and navigate
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    navigate("/register")
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
              <Field type="text" name="username" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
              <Field type="password" name="password" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" className="w-full font-bold bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Form>
        </Formik>
        <div className="mt-3 mb-0">
          <p>Not registered? </p>
          <button onClick={handleRegister} className="bg-blue-500 w-full mt-2 font-bold shadow-lg shadow-blue-500/50 text-white p-2 rounded hover:bg-blue-600">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;