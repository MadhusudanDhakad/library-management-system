import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

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

    const fetchIssuedBooks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL/api/users/me}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // const res = await axios.get("http://localhost:5000/api/users/me", {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // });
        console.log("Fetched user data: ", res.data);
        setIssuedBooks(res.data.issuedBooks || []);
      } catch (err) {
        console.error("Error Fetching issued books: ", err.response || err);
        toast.error("Error fetching issued books. Please try again.");
      }
    };

    fetchBooks();
    fetchIssuedBooks();
  }, []);

  const handleRequestBook = async (bookId) => {
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
      console.error("Error requesting book:", err.response ? err.response.data : err.message);
      toast.error("Error requesting book. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <h2 className="text-xl font-bold mb-2">Available Books</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{book.title}</td>
              <td className="border border-gray-300 p-2">{book.author}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleRequestBook(book._id)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mt-4 mb-2">Issued Books</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{book.title}</td>
              <td className="border border-gray-300 p-2">{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;