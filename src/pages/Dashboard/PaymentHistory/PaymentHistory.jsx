import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoneyBillWave } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending, isError } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // 🔄 Loading spinner
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.span
          className="loading loading-spinner loading-lg text-lime-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  // ⚠️ Error state
  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium py-10">
        ⚠️ Failed to load payment history.
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto text-gray-800 dark:text-gray-100 transition-colors duration-300"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-lime-600 dark:text-lime-400"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        💳 Payment History{" "}
        <span className="text-gray-600 dark:text-gray-300">
          ({payments.length})
        </span>
      </motion.h2>

      {/* Table container */}
      <motion.div
        className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {payments.length === 0 ? (
          // 💸 Empty state animation
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-6xl text-gray-400 mb-3"
            >
              <FaMoneyBillWave />
            </motion.div>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No payment history found.
            </p>
          </motion.div>
        ) : (
          <table className="table w-full text-sm md:text-base">
            <thead className="bg-lime-100 dark:bg-gray-700 text-lime-800 dark:text-gray-100 uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4">Parcel ID</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Paid At</th>
              </tr>
            </thead>

            {/* Table rows with animation */}
            <tbody>
              <AnimatePresence>
                {payments.map((payment, index) => (
                  <motion.tr
                    key={payment.transactionId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-lime-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-800 dark:text-gray-100">
                      {payment.parcelId}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {payment.email}
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                      ৳{payment.amount}
                    </td>
                    <td className="px-4 py-3 uppercase text-indigo-600 dark:text-indigo-400 font-medium">
                      {payment.method || "card"}
                    </td>
                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-mono text-sm">
                      {payment.transactionId}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {moment(payment.paid_at).format("DD MMM YYYY, h:mm A")}
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

export default PaymentHistory;
