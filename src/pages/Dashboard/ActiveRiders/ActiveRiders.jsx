import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserSlash, FaBiking } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [riders, setRiders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      const res = await axiosSecure.get("/riders?status=active");
      setRiders(res.data);
    } catch (error) {
      console.error("Error loading active riders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (riderId) => {
    const confirm = await MySwal.fire({
      title: "Are you sure?",
      text: "You want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
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
    r.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-lime-600 flex items-center gap-2">
          🟢 Active Riders
        </h2>
        <span className="badge badge-success text-white text-sm px-3 py-2">
          {riders.length} Active
        </span>
      </div>

      {/* Search box */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="relative w-full max-w-xs">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        className="overflow-x-auto shadow-xl rounded-2xl bg-white/60 backdrop-blur-md border border-lime-100"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.span
              className="loading loading-spinner loading-lg text-success"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        ) : filteredRiders.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-5xl text-gray-400 mb-3"
            >
              <FaBiking />
            </motion.div>
            <p className="text-lg text-gray-500">No active riders found.</p>
          </motion.div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-lime-100 text-lime-800">
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
              <AnimatePresence>
                {filteredRiders.map((rider, index) => (
                  <motion.tr
                    key={rider._id}
                    className="hover:bg-lime-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <td>{index + 1}</td>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.phone}</td>
                    <td>{rider.region || "N/A"}</td>
                    <td>{rider.district || "N/A"}</td>
                    <td>{rider.bikeBrand || "N/A"}</td>
                    <td>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeactivate(rider._id)}
                        className="btn btn-sm btn-error text-white flex items-center gap-1"
                      >
                        <FaUserSlash /> Deactivate
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ActiveRiders;
