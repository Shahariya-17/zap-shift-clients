import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
        🏍️ Be a Rider Application
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Readonly Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Readonly Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Your Age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* NID */}
        <div>
          <label className="block mb-1 font-medium">NID Card Number</label>
          <input
            type="text"
            name="nid"
            placeholder="Your NID Number"
            value={formData.nid}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Region */}
        <div>
          <label className="block mb-1 font-medium">Region</label>
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

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
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

        {/* Bike Brand */}
        <div>
          <label className="block mb-1 font-medium">Bike Brand</label>
          <input
            type="text"
            name="bikeBrand"
            placeholder="e.g. Yamaha, Honda"
            value={formData.bikeBrand}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Bike Reg Number */}
        <div>
          <label className="block mb-1 font-medium">Bike Registration Number</label>
          <input
            type="text"
            name="bikeRegNumber"
            placeholder="e.g. DHAKA-XYZ-1234"
            value={formData.bikeRegNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn bg-lime-500 hover:bg-lime-600 text-white font-bold w-full"
        >
          🚀 Submit Application
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BeARider;
