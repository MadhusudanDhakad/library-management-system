import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTransactions(res.data);
      } catch (err) {
        toast.error("Error fetching transactions. Please try again.");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Book</th>
            <th className="border border-gray-300 p-2">Issue Date</th>
            <th className="border border-gray-300 p-2">Return Date</th>
            <th className="border border-gray-300 p-2">Fine Amount</th>
            <th className="border border-gray-300 p-2">Fine Paid</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{transaction.userId}</td>
              <td className="border border-gray-300 p-2">{transaction.bookId}</td>
              <td className="border border-gray-300 p-2">{new Date(transaction.issueDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{new Date(transaction.returnDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{transaction.fineAmount}</td>
              <td className="border border-gray-300 p-2">{transaction.finePaid ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;