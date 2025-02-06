import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const ReturnBook = () => {
  const initialValues = {
    bookId: "",
    returnDate: new Date().toISOString().split("T")[0],
  };

  const validationSchema = Yup.object({
    bookId: Yup.string().required("Book ID is required"),
    returnDate: Yup.date().required("Return date is required"),
  });

  const onSubmit = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/transactions/return", values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Book returned successfully!");
    } catch (err) {
      toast.error("Error returning book. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Return Book</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">Book ID</label>
            <Field type="text" name="bookId" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="bookId" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">Return Date</label>
            <Field type="date" name="returnDate" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="returnDate" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Return Book
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReturnBook;