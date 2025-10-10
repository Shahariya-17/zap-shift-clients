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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
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
        const uniqueRegions = [...new Set(data.map((c) => c.region))];
        setRegions(uniqueRegions);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (senderRegion) {
      const filteredDistricts = serviceCenters
        .filter((c) => c.region === senderRegion)
        .map((c) => c.district);
      setSenderDistricts([...new Set(filteredDistricts)]);
      setSenderWarehouses([]);
    } else {
      setSenderDistricts([]);
      setSenderWarehouses([]);
    }
  }, [senderRegion, serviceCenters]);

  useEffect(() => {
    if (senderRegion && senderDistrict) {
      const matched = serviceCenters.find(
        (c) => c.region === senderRegion && c.district === senderDistrict
      );
      setSenderWarehouses(matched?.covered_area || []);
    } else {
      setSenderWarehouses([]);
    }
  }, [senderRegion, senderDistrict, serviceCenters]);

  useEffect(() => {
    if (receiverRegion) {
      const filteredDistricts = serviceCenters
        .filter((c) => c.region === receiverRegion)
        .map((c) => c.district);
      setReceiverDistricts([...new Set(filteredDistricts)]);
      setReceiverWarehouses([]);
    } else {
      setReceiverDistricts([]);
      setReceiverWarehouses([]);
    }
  }, [receiverRegion, serviceCenters]);

  useEffect(() => {
    if (receiverRegion && receiverDistrict) {
      const matched = serviceCenters.find(
        (c) => c.region === receiverRegion && c.district === receiverDistrict
      );
      setReceiverWarehouses(matched?.covered_area || []);
    } else {
      setReceiverWarehouses([]);
    }
  }, [receiverRegion, receiverDistrict, serviceCenters]);

  const onSubmit = async (data) => {
    const sameRegion = data.sender_region === data.receiver_region;
    const sameDistrict = data.sender_district === data.receiver_district;
    const withinCity = sameRegion && sameDistrict;

    const typeLabel = data.type === "document" ? "Document" : "Non-Document";
    const weight = parseFloat(data.weight) || 0;
    const zone = withinCity ? "Within City" : "Outside City";

    let baseCost = 0;
    let extraCharge = 0;
    let conditionNote = "";

    if (data.type === "document") {
      baseCost = withinCity ? 60 : 80;
      conditionNote = "Document pricing is flat regardless of weight.";
    } else {
      if (weight <= 3) {
        baseCost = withinCity ? 110 : 150;
        conditionNote = "Up to 3kg: Flat rate applies.";
      } else {
        const extraKg = weight - 3;
        baseCost = withinCity ? 110 : 150;
        extraCharge = 40 * extraKg + (withinCity ? 0 : 40);
        conditionNote = `>3kg: ৳40/kg${withinCity ? "" : " + ৳40 extra"}`;
      }
    }

    const totalCost = baseCost + extraCharge;

    const breakdownHTML = `
      <div style="font-size:14px; text-align:left; line-height:1.6; background-color:#f9f9f9; padding:15px; border-radius:10px;">
        <b>Parcel Type:</b> ${typeLabel}<br/>
        <b>Weight:</b> ${weight} kg<br/>
        <b>Delivery Zone:</b> ${zone}<hr/>
        <b>Base Cost:</b> ৳${baseCost}<br/>
        <b>Extra Charge:</b> ৳${extraCharge}<br/>
        <b>Total:</b> <span style="color:green;">৳${totalCost}</span>
      </div>
    `;

    const result = await MySwal.fire({
      title: "Cost Breakdown",
      html: breakdownHTML,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Proceed",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const parcelData = {
        ...data,
        email: user?.email || "unknown",
        creation_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        cost: totalCost,
        tracking_id: `TRK-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        status: "pending",
        payment_status: "unpaid",
      };

      const res = await axiosSecure.post("/parcels", parcelData);
      if (res.data.insertedId) {
        MySwal.fire({
          title: "Success!",
          text: "Parcel submitted successfully. Redirecting...",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 via-white to-green-50 py-12 px-4">
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 relative overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center text-lime-600 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Send a Parcel
        </motion.h2>
        <p className="text-center text-gray-500 mb-10">
          Fill in all required details to create a parcel order
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Parcel Info */}
          <motion.div
            className="p-6 bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl shadow-inner"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              📦 Parcel Info
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
                className="input input-bordered w-full focus:ring-2 focus:ring-lime-400 transition-all"
              />
              {parcelType === "non-document" && (
                <input
                  type="number"
                  step="0.1"
                  {...register("weight")}
                  placeholder="Weight (kg)"
                  className="input input-bordered w-full focus:ring-2 focus:ring-lime-400 transition-all"
                />
              )}
            </div>
          </motion.div>

          {/* Sender & Receiver */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Sender Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                🧑‍💼 Sender Info
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
                  className="input input-bordered w-full focus:ring-2 focus:ring-lime-400"
                />
                <select
                  {...register("sender_region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
                <select
                  {...register("sender_district", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {senderDistricts.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <select
                  {...register("sender_service_center", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Area</option>
                  {senderWarehouses.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
                <input
                  {...register("sender_address", { required: true })}
                  placeholder="Full Address"
                  className="input input-bordered w-full"
                />
                <textarea
                  {...register("pickup_instruction", { required: true })}
                  placeholder="Pickup Instruction"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>

            {/* Receiver Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                🏠 Receiver Info
              </h3>
              <div className="space-y-3">
                <input
                  {...register("receiver_name", { required: true })}
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                />
                <input
                  {...register("receiver_contact", { required: true })}
                  placeholder="Contact Number"
                  className="input input-bordered w-full"
                />
                <select
                  {...register("receiver_region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select
                  {...register("receiver_district", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {receiverDistricts.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <select
                  {...register("receiver_service_center", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Area</option>
                  {receiverWarehouses.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
                <input
                  {...register("receiver_address", { required: true })}
                  placeholder="Delivery Address"
                  className="input input-bordered w-full"
                />
                <textarea
                  {...register("delivery_instruction", { required: true })}
                  placeholder="Delivery Instruction"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div
            className="text-center pt-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              type="submit"
              className="btn bg-lime-500 text-black w-full rounded-2xl hover:bg-lime-400 hover:shadow-lg transition-all py-3 text-lg font-semibold"
            >
              🚀 Submit Parcel
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SendParcel;
