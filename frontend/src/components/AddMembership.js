import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AddMembership = () => {
  const initialValues = {
    username: "",
    membershipType: "6 months",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    membershipType: Yup.string().required("Membership type is required"),
  });

  const onSubmit = async (values) => {
    try {
       await axios.post(`${process.env.REACT_APP_BASE_URL/api/membership/add}`, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // await axios.post("http://localhost:5000/api/membership/add", values, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      toast.success("Membership added successfully!");
    } catch (err) {
      toast.error("Error adding membership. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Membership</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Field type="text" name="username" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700">Membership Type</label>
            <Field as="select" name="membershipType" className="mt-1 p-2 w-full border rounded">
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
              <option value="2 years">2 Years</option>
            </Field>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Membership
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddMembership;
