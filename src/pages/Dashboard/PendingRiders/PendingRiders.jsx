import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle, FaTimesCircle, FaUserShield } from 'react-icons/fa';
import { MdOutlinePreview } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useQuery } from '@tanstack/react-query';

const MySwal = withReactContent(Swal);

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  
  const {isPending: loading, error, data: pendingRiders = [], refetch} = useQuery({
    queryKey: ['pendingRiders'],
    queryFn: async() => {
      const res = await axiosSecure.get('/rider-applications/pending');
      return res.data;
    }
  });

  if (loading) {
    return <span className="loading loading-spinner text-success"></span>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading pending riders: {error.message}</span>
        </div>
      </div>
    );
  }

  const handleDecision = async (id, action) => {
    try {
      const result = await MySwal.fire({
        title: `Are you sure you want to ${action} this application?`,
        text: `This action cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${action} it!`
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/rider-applications/${id}`, {
          status: action
        });

        if (res.data.modifiedCount > 0 || res.data.deletedCount > 0) {
          refetch();
          MySwal.fire(
            'Success!',
            `Application has been ${action}.`,
            'success'
          );
          setSelectedRider(null);
        }
      }
    } catch (error) {
      console.error(`Error ${action} application:`, error);
      MySwal.fire(
        'Error!',
        `Failed to ${action} application. Please try again.`,
        'error'
      );
    }
  };

  const handleViewDetails = (rider) => {
    setSelectedRider(rider);
  };

  const handleCloseModal = () => {
    setSelectedRider(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date) ? 'N/A' : date.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserShield className="text-green-600" />
            Pending Rider Applications
          </h2>
          <span className="badge badge-primary">
            {pendingRiders.length} Pending
          </span>
        </div>

        {pendingRiders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No pending rider applications</h3>
            <p className="text-gray-500 mt-1">All rider applications have been processed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
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
                {pendingRiders.map((rider) => (
                  <tr key={rider._id} className="hover">
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.phone}</td>
                    <td>{rider.region || 'N/A'}</td>
                    <td>{rider.district || 'N/A'}</td>
                    <td>{formatDate(rider.appliedAt)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button onClick={() => handleViewDetails(rider)} className="btn btn-sm btn-info text-white" title="View Details">
                          <MdOutlinePreview size={16} />
                        </button>
                        <button onClick={() => handleDecision(rider._id, 'approved')} className="btn btn-sm btn-success text-white" title="Approve">
                          <FaCheckCircle size={16} />
                        </button>
                        <button onClick={() => handleDecision(rider._id, 'cancelled')} className="btn btn-sm btn-error text-white" title="Reject">
                          <FaTimesCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Rider Application Details
                </h3>
                <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost">✕</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <DetailItem label="Full Name" value={selectedRider.name} />
                  <DetailItem label="Email" value={selectedRider.email} />
                  <DetailItem label="Phone" value={selectedRider.phone} />
                  <DetailItem label="Age" value={selectedRider.age} />
                  <DetailItem label="Region" value={selectedRider.region} />
                  <DetailItem label="District" value={selectedRider.district} />
                </div>
                <div className="space-y-2">
                  <DetailItem label="NID Number" value={selectedRider.nid} />
                  <DetailItem label="Bike Brand" value={selectedRider.bikeBrand} />
                  <DetailItem label="Bike Registration" value={selectedRider.bikeRegNumber} />
                  <DetailItem label="Applied On" value={formatDateTime(selectedRider.appliedAt)} />
                  <DetailItem label="Status" value={
                    <span className={`badge ${selectedRider.status === 'pending' ? 'badge-warning' : selectedRider.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                      {selectedRider.status}
                    </span>
                  } />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                <button onClick={() => handleDecision(selectedRider._id, 'cancelled')} className="btn btn-error">
                  <FaTimesCircle className="mr-2" />
                  Reject Application
                </button>
                <button onClick={() => handleDecision(selectedRider._id, 'approved')} className="btn btn-success">
                  <FaCheckCircle className="mr-2" />
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">
      {value || <span className="text-gray-400">Not provided</span>}
    </dd>
  </div>
);

export default PendingRiders;