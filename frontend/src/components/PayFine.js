import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const PayFine = ({ transactionId }) => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/transactions/${transactionId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // const res = await axios.get(`http://localhost:5000/api/transactions/${transactionId}`, {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // });
        setTransaction(res.data);
      } catch (err) {
        toast.error("Error fetching transaction. Please try again.");
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const initialValues = {
    finePaid: false,
    remarks: "",
  };

  const validationSchema = Yup.object({
    finePaid: Yup.boolean().required("Fine payment status is required"),
    remarks: Yup.string(),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/transactions/${transactionId}/payfine`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      // await axios.put(`http://localhost:5000/api/transactions/${transactionId}/payfine`, values, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      toast.success("Fine paid successfully!");
    } catch (err) {
      toast.error("Error paying fine. Please try again.");
    }
  };

  if (!transaction) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pay Fine</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="finePaid" className="block text-sm font-medium text-gray-700">Fine Paid</label>
            <Field type="checkbox" name="finePaid" className="mt-1 p-2 border rounded" />
            <ErrorMessage name="finePaid" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
            <Field as="textarea" name="remarks" className="mt-1 p-2 w-full border rounded" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Pay Fine
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PayFine;
