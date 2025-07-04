import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [riders, setRiders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      const res = await axiosSecure.get("/riders?status=active");
      setRiders(res.data);
    } catch (error) {
      console.error("Error loading active riders", error);
    }
  };

  const handleDeactivate = async (riderId) => {
    const confirm = await MySwal.fire({
      title: "Are you sure?",
      text: "You want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${riderId}/deactivate`);
        if (res.data.modifiedCount > 0) {
          MySwal.fire("Deactivated!", "Rider is now inactive.", "success");
          fetchRiders();
        }
      } catch (error) {
        console.error("Error deactivating rider", error);
      }
    }
  };

  const filteredRiders = riders.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-lime-600 mb-4">🟢 Active Riders</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="text-lg text-gray-500" />
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  No active riders found.
                </td>
              </tr>
            ) : (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.bikeBrand}</td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-sm btn-error text-white flex items-center gap-1"
                    >
                      <FaUserSlash /> Deactivate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
