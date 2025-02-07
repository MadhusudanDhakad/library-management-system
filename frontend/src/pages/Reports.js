import React from "react";
import BooksReport from "../components/BooksReport";
import TransactionsReport from "../components/TransactionsReport";

const Reports = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <BooksReport />
      <TransactionsReport />
    </div>
  );
};

export default Reports;
