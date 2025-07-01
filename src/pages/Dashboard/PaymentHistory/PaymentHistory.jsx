import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending, isError } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        ⚠️ Failed to load payment history.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
        💳 Payment History ({payments.length})
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold text-base-content">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment.transactionId}>
                  <td>{index + 1}</td>
                  <td className="text-sm font-mono text-gray-700">{payment.parcelId}</td>
                  <td className="text-sm">{payment.email}</td>
                  <td className="text-green-600 font-semibold">${payment.amount}</td>
                  <td className="uppercase text-sm text-indigo-500 font-medium">
                    {payment.method || 'card'}
                  </td>
                  <td className="text-blue-600 font-mono text-sm">{payment.transactionId}</td>
                  <td>{moment(payment.paid_at).format('DD MMM YYYY, h:mm A')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
