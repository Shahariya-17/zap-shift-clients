import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";

const MySwal = withReactContent(Swal);

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handlePay = (id) => navigate(`/dashboard/payment/${id}`);

  const handleDelete = async (parcel) => {
    const result = await MySwal.fire({
      title: `Delete "${parcel.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#ef4444",
      background: "#fefefe",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/parcels/${parcel._id}`);
      if (res.data.deletedCount > 0) {
        await MySwal.fire("🗑️ Deleted!", "Parcel has been removed.", "success");
        refetch();
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-lime-500"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium py-10">
        ⚠️ Failed to load your parcels.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 text-center text-lime-600 dark:text-lime-400">
        📦 My Parcels <span className="text-gray-600 dark:text-gray-300">({parcels.length})</span>
      </h2>

      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 uppercase tracking-wide">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Cost</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500 dark:text-gray-400">
                  No parcels found.
                </td>
              </tr>
            ) : (
              parcels.map((parcel, idx) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-lime-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    {parcel.title}
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-700 dark:text-gray-300">
                    {parcel.type}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {moment(parcel.creation_date).format("DD MMM YYYY, h:mm A")}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                    ৳{parcel.cost}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge badge-md font-medium ${
                        parcel.payment_status === "paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
                    <button
                      className="btn btn-sm bg-sky-500 hover:bg-sky-600 text-white border-none"
                      onClick={() =>
                        navigate(`/dashboard/parcel-details/${parcel._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
                      onClick={() => handlePay(parcel._id)}
                      disabled={parcel.payment_status === "paid"}
                    >
                      Pay
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                      onClick={() => handleDelete(parcel)}
                    >
                      Delete
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

export default MyParcels;
