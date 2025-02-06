import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

  const initialValues = {
    username: "",
    role: "user",
    permissions: [],
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Role is required"),
    permissions: Yup.array().of(Yup.string()),
  });

  const onSubmit = async (values) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/transactions/${userId}`, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // await axios.put(`http://localhost:5000/api/users/${userId}`, values, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      toast.success("User updated successfully!");
    } catch (err) {
      toast.error("Error updating user. Please try again.");
    }
  };

  const fetchUser = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/transactions/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      setUser(res.data);
    } catch (err) {
      toast.error("Error fetching user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const permissionsList = ["read", "write", "delete", "manage_users"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <div className="mb-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      {user && (
        <Formik
          initialValues={{ username: user.username, role: user.role, permissions: user.permissions }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field type="text" name="username" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <Field as="select" name="role" className="mt-1 p-2 w-full border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <div className="mt-1 space-y-2">
                {permissionsList.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <Field type="checkbox" name="permissions" value={permission} className="mr-2" />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Update User
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default UpdateUser;