import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const IssueBook = () => {
  const initialValues = {
    bookId: "",
    issueDate: new Date().toISOString().split("T")[0],
    returnDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0],
    remarks: "",
  };

  const validationSchema = Yup.object({
    bookId: Yup.string().required("Book ID is required"),
    issueDate: Yup.date().required("Issue date is required"),
    returnDate: Yup.date().required("Return date is required"),
  });

  const onSubmit = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL/api/transactions/issue}`, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // await axios.post("http://localhost:5000/api/transactions/issue", values, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      toast.success("Book issued successfully!");
    } catch (err) {
      toast.error("Error issuing book. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Issue Book</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">Book ID</label>
            <Field type="text" name="bookId" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="bookId" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">Issue Date</label>
            <Field type="date" name="issueDate" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="issueDate" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">Return Date</label>
            <Field type="date" name="returnDate" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="returnDate" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
            <Field as="textarea" name="remarks" className="mt-1 p-2 w-full border rounded" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Issue Book
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default IssueBook;