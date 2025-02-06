import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BooksReport = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/books`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // const res = await axios.get("http://localhost:5000/api/books", {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // });
        setBooks(res.data);
      } catch (err) {
        toast.error("Error fetching books. Please try again.");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books Report</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Serial No</th>
            <th className="border border-gray-300 p-2">Availability</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{book.title}</td>
              <td className="border border-gray-300 p-2">{book.author}</td>
              <td className="border border-gray-300 p-2">{book.type}</td>
              <td className="border border-gray-300 p-2">{book.serialNo}</td>
              <td className="border border-gray-300 p-2">{book.isAvailable ? "Available" : "Issued"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksReport;
