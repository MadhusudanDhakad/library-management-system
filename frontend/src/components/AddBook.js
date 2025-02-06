import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    author: "",
    type: "fiction",
    serialNo: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    serialNo: Yup.string().required("Serial number is required"),
  });

  const onSubmit = async (values) => {
    try {
      await axios.post(process.env.REACT_APP_BASE_URL, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // await axios.post("http://localhost:5000/api/books", values, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      toast.success("Book added successfully!");
      await navigate("/books");
    } catch (err) {
      toast.error("Error adding book. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-300 p-8 rounded shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),      _0px_16px_56px_rgba(17,17,26,0.1)] w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Add Book</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <Field type="text" name="title" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
              <Field type="text" name="author" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Genre</label>
              <Field as="select" name="type" className="mt-1 p-2 w-full border rounded">
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="self-help">Self help</option>
                <option value="education-academic">Educational & Academic</option>
                <option value="poetry-drama">Poetry & Drama</option>
                <option value="childrens-youth">Children’s & Young Adult</option>
                <option value="comic-graphic">Comics & Graphic Novels</option>
              </Field>
            </div>
            <div>
              <label htmlFor="serialNo" className="block text-sm font-medium text-gray-700">Serial Number</label>
              <Field type="text" name="serialNo" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="serialNo" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
              Add Book
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddBook;


