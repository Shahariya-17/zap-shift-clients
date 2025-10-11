import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySwal = withReactContent(Swal);

const SendParcel = ({ senderName = "Shahariyar" }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [serviceCenters, setServiceCenters] = useState([]);
  const [regions, setRegions] = useState([]);
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [senderWarehouses, setSenderWarehouses] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverWarehouses, setReceiverWarehouses] = useState([]);

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const senderDistrict = watch("sender_district");
  const receiverRegion = watch("receiver_region");
  const receiverDistrict = watch("receiver_district");

  useEffect(() => {
    fetch("/serviceCenter.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
        setRegions([...new Set(data.map((c) => c.region))]);
      });
  }, []);

  useEffect(() => {
    if (senderRegion) {
      const filtered = serviceCenters.filter((c) => c.region === senderRegion);
      setSenderDistricts([...new Set(filtered.map((c) => c.district))]);
      setSenderWarehouses([]);
    }
  }, [senderRegion, serviceCenters]);

  useEffect(() => {
    if (senderRegion && senderDistrict) {
      const matched = serviceCenters.find(
        (c) => c.region === senderRegion && c.district === senderDistrict
      );
      setSenderWarehouses(matched?.covered_area || []);
    }
  }, [senderRegion, senderDistrict, serviceCenters]);

  useEffect(() => {
    if (receiverRegion) {
      const filtered = serviceCenters.filter(
        (c) => c.region === receiverRegion
      );
      setReceiverDistricts([...new Set(filtered.map((c) => c.district))]);
      setReceiverWarehouses([]);
    }
  }, [receiverRegion, serviceCenters]);

  useEffect(() => {
    if (receiverRegion && receiverDistrict) {
      const matched = serviceCenters.find(
        (c) => c.region === receiverRegion && c.district === receiverDistrict
      );
      setReceiverWarehouses(matched?.covered_area || []);
    }
  }, [receiverRegion, receiverDistrict, serviceCenters]);

  const onSubmit = async (data) => {
    const sameRegion = data.sender_region === data.receiver_region;
    const sameDistrict = data.sender_district === data.receiver_district;
    const withinCity = sameRegion && sameDistrict;
    const weight = parseFloat(data.weight) || 0;

    let base = data.type === "document" ? (withinCity ? 60 : 80) : withinCity ? 110 : 150;
    let extra = data.type === "document" ? 0 : weight > 3 ? (weight - 3) * 40 + (withinCity ? 0 : 40) : 0;
    const totalCost = base + extra;

    const html = `
      <div style="text-align:left;line-height:1.5">
        <b>Type:</b> ${data.type}<br/>
        <b>Zone:</b> ${withinCity ? "Within City" : "Outside City"}<br/>
        <b>Weight:</b> ${weight}kg<br/><hr/>
        <b>Cost:</b> ৳${totalCost}
      </div>
    `;
    const result = await MySwal.fire({
      title: "Confirm Parcel Cost",
      html,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      const parcelData = {
        ...data,
        email: user?.email,
        creation_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        cost: totalCost,
        payment_status: "unpaid",
      };
      const res = await axiosSecure.post("/parcels", parcelData);
      if (res.data.insertedId) {
        MySwal.fire({
          title: "✅ Parcel Created!",
          text: "Your parcel has been submitted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-lime-200 via-white to-green-100 py-16 px-6">
      {/* Animated Background Lights */}
      <motion.div
        className="absolute top-40 left-20 w-72 h-72 bg-lime-300 rounded-full blur-3xl opacity-40"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="relative max-w-6xl mx-auto backdrop-blur-xl bg-white/60 border border-lime-200 shadow-2xl rounded-3xl p-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl font-extrabold text-center bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Send a Parcel 🚀
        </motion.h2>
        <p className="text-center text-gray-500 mb-10 text-lg">
          Fill in all required details to book your parcel easily.
        </p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Parcel Type */}
          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-r from-lime-50 to-green-50 border border-lime-100 shadow-inner"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              📦 Parcel Information
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio radio-success"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio radio-success"
                  />
                  <span>Non-Document</span>
                </label>
              </div>
              <input
                {...register("title", { required: true })}
                placeholder="Parcel Title"
                className="input input-bordered w-full focus:ring-2 focus:ring-lime-500 transition-all"
              />
              {parcelType === "non-document" && (
                <input
                  type="number"
                  step="0.1"
                  {...register("weight")}
                  placeholder="Weight (kg)"
                  className="input input-bordered w-full focus:ring-2 focus:ring-lime-500 transition-all"
                />
              )}
            </div>
          </motion.div>

          {/* Sender / Receiver Section */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            {/* Sender */}
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                🧑‍💼 Sender Information
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={senderName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
                <input
                  {...register("sender_contact", { required: true })}
                  placeholder="Contact Number"
                  className="input input-bordered w-full focus:ring-2 focus:ring-lime-500"
                />
                <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select {...register("sender_district", { required: true })} className="select select-bordered w-full">
                  <option value="">Select District</option>
                  {senderDistricts.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <select {...register("sender_service_center", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Area</option>
                  {senderWarehouses.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
                <textarea
                  {...register("sender_address", { required: true })}
                  placeholder="Full Address"
                  className="textarea textarea-bordered w-full focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </div>

            {/* Receiver */}
            <div className="bg-white/80 rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                🏠 Receiver Information
              </h3>
              <div className="space-y-3">
                <input
                  {...register("receiver_name", { required: true })}
                  placeholder="Receiver Name"
                  className="input input-bordered w-full focus:ring-2 focus:ring-lime-500"
                />
                <input
                  {...register("receiver_contact", { required: true })}
                  placeholder="Contact Number"
                  className="input input-bordered w-full focus:ring-2 focus:ring-lime-500"
                />
                <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select {...register("receiver_district", { required: true })} className="select select-bordered w-full">
                  <option value="">Select District</option>
                  {receiverDistricts.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <select {...register("receiver_service_center", { required: true })} className="select select-bordered w-full">
                  <option value="">Select Area</option>
                  {receiverWarehouses.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
                <textarea
                  {...register("receiver_address", { required: true })}
                  placeholder="Delivery Address"
                  className="textarea textarea-bordered w-full focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div className="text-center pt-6" whileHover={{ scale: 1.05 }}>
            <button
              type="submit"
              className="btn bg-gradient-to-r from-lime-500 to-green-500 text-black font-semibold rounded-2xl px-10 py-4 text-lg hover:shadow-lime-300/50 hover:shadow-2xl transition-all duration-300"
            >
              ✈️ Submit Parcel
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SendParcel;
