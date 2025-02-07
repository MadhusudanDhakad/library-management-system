import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddMembership from "../components/AddMembership";
import UpdateMembership from "../components/UpdateMembership";

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/memberships", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMemberships(res.data);
    } catch (err) {
      console.error("Fetch Memberships Error:", err.response?.data || err.message); // Improved error logging
      toast.error(err.response?.data?.message || "Error fetching memberships."); // Better error message handling
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid membership ID."); // prevent errors if `id` is missing
      return;
    }

    if (!window.confirm("Are you sure you want to delete this membership?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/memberships/${id}`);
      toast.success("Membership deleted successfully!");
      // fetchMemberships();
      // setMemberships(memberships.filter((m) => m._id !== id)); // Update state instead of refetching
      setMemberships((prev) => prev.filter((m) => m._id !== id)); // optimized state update
    } catch (err) {
      console.error("Delete Membership Error:", err.response?.data || err.message); // Improved error logging
      toast.error(err.response?.data?.message || "Error deleting membership."); // Better error message handling
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Memberships</h1>
      <AddMembership onAdd={fetchMemberships} />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-600">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships.length > 0 ? (
            memberships.map((membership) => (
              <tr key={membership._id || membership.id || Math.random()} className="hover:bg-gray-400 bg-gray-300">
                <td className="border border-gray-400 p-2">{membership.name || "N/A"}</td>
                <td className="border border-gray-400 p-2">{membership.duration || "N/A"}</td>
                <td className="border border-gray-400 p-2">{membership.price ? `$${membership.price}` : "N/A"}</td>
                <td className="border border-gray-400 p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setSelectedMembership(membership)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(membership._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-600">
                No memberships found. 
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {selectedMembership && (
        <UpdateMembership
          membership={selectedMembership}
          onUpdate={fetchMemberships}
          onClose={() => setSelectedMembership(null)}
        />
      )}
    </div>
  );
};

export default Membership;
