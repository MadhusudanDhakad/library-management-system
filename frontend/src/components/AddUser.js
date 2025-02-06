import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    role: "user",
    permissions: [],
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
    permissions: Yup.array().of(Yup.string()),
  });

  const onSubmit = async (values) => {
    try {
      // await axios.post("http://localhost:5000/api/auth/register", values, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      await axios.post(`${process.env.REACT_APP_BASE_URL/api/auth/register}`, values, {
        headers: { "Content-Type": "application/json" },
      });
      // await axios.post("http://localhost:5000/api/auth/register", values, {
      //   headers: { "Content-Type": "application/json" },
      // });
      toast.success("User added successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Error adding user. Please try again.");
    }
  };

  const handleLogin = async () => {
    navigate("/login");
  }

  const permissionsList = ["read", "write", "delete", "manage_users"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-600">Add User</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-2">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-400">Username</label>
              <Field type="text" name="username" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-400">Password</label>
              <Field type="password" name="password" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="role" className="block text-lg font-medium text-gray-400">Role</label>
              <Field as="select" name="role" className="mt-1 p-2 w-full border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-400">Permissions</label>
              <div className="mt-1 space-y-0">
                {permissionsList.map((permission) => (
                  <label key={permission} className="flex items-center text-gray-600">
                    <Field type="checkbox" name="permissions" value={permission} className="mr-2" />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="bg-blue-500 w-full shadow-lg shadow-blue-500/50 text-white p-2 rounded hover:bg-blue-600">
              Add User
            </button>
          </Form>
        </Formik>
        <div className="mt-3 mb-0">
          <p>Already a user? </p>
          <button onClick={handleLogin} className="bg-blue-500 w-full shadow-lg shadow-blue-500/50 text-white p-2 rounded hover:bg-blue-600">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;