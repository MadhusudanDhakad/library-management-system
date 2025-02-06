import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookRequests, setBookRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        toast.error("Error fetching users. Please try again.");
      }
    };

    const fetchBookRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books/requests", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBookRequests(res.data);
      } catch (err) {
        toast.error("Error fetching book requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchBookRequests();
  }, []);

  const handleIssueBook = async (requestId, bookId, userId) => {
    try {
      if (!requestId || !bookId || !userId) {
        throw new Error("Missing required fields");
      }

      await axios.post(
        "http://localhost:5000/api/books/issue",
        { requestId, bookId, userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Book issued successfully!");

      // Refresh book requests after issuing a book
      const res = await axios.get("http://localhost:5000/api/books/requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookRequests(res.data);
    } catch (err) {
      console.log("Error issuing book: ", err);
      toast.error("Error issuing book. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-4"> Loading... </div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mt-4 mb-2">Book Requests</h2>
      {bookRequests.length === 0 ? (
        <p>No book requests found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Book Title</th>
              <th className="border border-gray-300 p-2">Requested By</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{request.book.title}</td>
                <td className="border border-gray-300 p-2">{request.user.username}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleIssueBook(request._id, request.book._id, request.user._id)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Issue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;