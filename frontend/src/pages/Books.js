import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL/api/books}`, {
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

  const requestBook = async (bookId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL/api/books/request}`,
        { bookId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      // await axios.post(
      //   "http://localhost:5000/api/books/request",
      //   { bookId },
      //   { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      // );
      toast.success("Book requested successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error requesting book.");
    }
  };

  return (
    <div className="p-4 w-11/12 m-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Books</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-600">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Serial No</th>
            <th className="border border-gray-300 p-2">Availability</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-400 bg-gray-300">
              <td className="border border-gray-400 p-2">{book.title}</td>
              <td className="border border-gray-400 p-2">{book.author}</td>
              <td className="border border-gray-400 p-2">{book.type}</td>
              <td className="border border-gray-400 p-2">{book.serialNo}</td>
              <td className="border border-gray-400 p-2">{book.isAvailable ? "Available" : "Issued"}</td>
              <td className="border border-gray-400 p-2">
                {book.isAvailable && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => requestBook(book._id)}
                  >
                    Request Book
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;