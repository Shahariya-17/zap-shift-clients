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

  const handlePay = (id) => {
    console.log("Proceed to payment", id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = async (parcel) => {
    const result = await MySwal.fire({
      title: `Delete "${parcel.title}"?`,
      text: "This action is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#ef4444",
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
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium py-10">
        ⚠️ Failed to load your parcels.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
        📦 My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold text-base-content">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created</th>
              <th>Cost</th>
              <th>Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            ) : (
              parcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <td>{idx + 1}</td>
                  <td className="font-medium">{parcel.title}</td>
                  <td className="capitalize">{parcel.type}</td>
                  <td>
                    {moment(parcel.creation_date).format("DD MMM YYYY, h:mm A")}
                  </td>
                  <td className="font-semibold text-green-600">
                    ৳{parcel.cost}
                  </td>
                  <td>
                    <span
                      className={`badge badge-md ${
                        parcel.payment_status === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={() =>
                        navigate(`/dashboard/parcel-details/${parcel._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => handlePay(parcel._id)}
                      disabled={parcel.payment_status === "paid"}
                    >
                      Pay
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
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
