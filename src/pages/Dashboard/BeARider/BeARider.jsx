import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Icons
import { FaUser, FaEnvelope, FaPhoneAlt, FaIdCard, FaMotorcycle } from "react-icons/fa";
import { MdLocationCity, MdPlace } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";

const MySwal = withReactContent(Swal);

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    age: "",
    region: "",
    district: "",
    phone: "",
    nid: "",
    bikeBrand: "",
    bikeRegNumber: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setFormData((prev) => ({
      ...prev,
      region,
      district: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/rider-applications", formData);
      if (res.data.insertedId) {
        MySwal.fire("✅ Success", "Application submitted!", "success");
      }
    } catch (error) {
      console.error(error);
      MySwal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  const regionOptions = [...new Set(serviceCenters.map((s) => s.region))];
  const districtOptions = useMemo(() => {
    return serviceCenters
      .filter((s) => s.region === formData.region)
      .map((s) => s.district);
  }, [formData.region, serviceCenters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border mt-10 mb-10"
    >
      <motion.h2
        className="text-4xl font-bold text-center text-lime-600 mb-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        🏍️ Be a Rider Application
      </motion.h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Personal Info */}
        <div className="col-span-full">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <FaUser className="text-lime-500" /> Personal Information
          </h3>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            value={formData.name}
            readOnly
            className="input input-bordered w-full bg-gray-100"
            placeholder="Full Name"
          />
        </div>

        <div className="col-span-1">
          <input
            type="email"
            value={formData.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
            placeholder="Email"
          />
        </div>

        <div className="col-span-1">
          <div className="relative">
            <BsFillCalendarDateFill className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative">
            <FaIdCard className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="nid"
              placeholder="NID Card Number"
              value={formData.nid}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Location Info */}
        <div className="col-span-full pt-4">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <MdPlace className="text-lime-500" /> Location Information
          </h3>
        </div>

        <div className="col-span-1">
          <select
            name="region"
            value={formData.region}
            onChange={handleRegionChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Region</option>
            {regionOptions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districtOptions.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Bike Info */}
        <div className="col-span-full pt-4">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <FaMotorcycle className="text-lime-500" /> Bike Information
          </h3>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="bikeBrand"
            placeholder="Bike Brand (e.g. Yamaha, Hero)"
            value={formData.bikeBrand}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="bikeRegNumber"
            placeholder="Bike Registration Number"
            value={formData.bikeRegNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-lg bg-lime-500 hover:bg-lime-400 text-black w-full font-bold rounded-xl"
          >
            🚀 Submit Rider Application
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default BeARider;
