import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserShield,
} from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: pendingRiders = [],
    isPending: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider-applications/pending");
      return res.data;
    },
  });

  const handleDecision = async (id, action) => {
    const result = await MySwal.fire({
      title: `Confirm ${action}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: `Yes, ${action}!`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/rider-applications/${id}`, {
          status: action,
        });
        if (res.data.modifiedCount > 0 || res.data.deletedCount > 0) {
          refetch();
          MySwal.fire("Success!", `Application ${action} successfully.`, "success");
          setSelectedRider(null);
        }
      } catch {
        MySwal.fire("Error!", `Failed to ${action} the application.`, "error");
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="loading loading-spinner loading-lg text-success"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-lg">
        ⚠️ Error loading pending riders: {error.message}
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-lime-600 flex items-center gap-2">
          <FaUserShield /> Pending Rider Applications
        </h2>
        <span className="badge badge-success text-white text-sm px-3 py-2">
          {pendingRiders.length} Pending
        </span>
      </div>

      {pendingRiders.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-gray-400 mb-4 text-5xl"
          >
            🛵
          </motion.div>
          <p className="text-lg text-gray-500">
            No pending rider applications found!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="overflow-x-auto shadow-xl rounded-2xl bg-white/60 backdrop-blur-md border border-lime-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="table table-zebra w-full">
            <thead className="bg-lime-100 text-lime-800">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Region</th>
                <th>District</th>
                <th>Applied On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {pendingRiders.map((rider) => (
                  <motion.tr
                    key={rider._id}
                    className="hover:bg-lime-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.phone}</td>
                    <td>{rider.region || "N/A"}</td>
                    <td>{rider.district || "N/A"}</td>
                    <td>{formatDate(rider.appliedAt)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedRider(rider)}
                          className="btn btn-sm btn-info text-white"
                        >
                          <MdOutlinePreview size={16} />
                        </button>
                        <button
                          onClick={() => handleDecision(rider._id, "approved")}
                          className="btn btn-sm btn-success text-white"
                        >
                          <FaCheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleDecision(rider._id, "cancelled")}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTimesCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedRider && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedRider(null)}
                className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>

              <h3 className="text-2xl font-semibold text-lime-700 mb-6">
                Rider Application Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Full Name" value={selectedRider.name} />
                <DetailItem label="Email" value={selectedRider.email} />
                <DetailItem label="Phone" value={selectedRider.phone} />
                <DetailItem label="Region" value={selectedRider.region} />
                <DetailItem label="District" value={selectedRider.district} />
                <DetailItem label="NID Number" value={selectedRider.nid} />
                <DetailItem label="Bike Brand" value={selectedRider.bikeBrand} />
                <DetailItem label="Bike Registration" value={selectedRider.bikeRegNumber} />
                <DetailItem label="Applied On" value={formatDateTime(selectedRider.appliedAt)} />
                <DetailItem
                  label="Status"
                  value={
                    <span
                      className={`badge ${
                        selectedRider.status === "pending"
                          ? "badge-warning"
                          : selectedRider.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {selectedRider.status}
                    </span>
                  }
                />
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                <button
                  onClick={() => handleDecision(selectedRider._id, "cancelled")}
                  className="btn btn-error"
                >
                  <FaTimesCircle className="mr-2" /> Reject
                </button>
                <button
                  onClick={() => handleDecision(selectedRider._id, "approved")}
                  className="btn btn-success"
                >
                  <FaCheckCircle className="mr-2" /> Approve
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="space-y-1">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-gray-900 text-sm">
      {value || <span className="text-gray-400">Not provided</span>}
    </dd>
  </div>
);

export default PendingRiders;
