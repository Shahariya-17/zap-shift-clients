import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const regions = ["Region A", "Region B", "Region C"];
const serviceCenters = {
  "Region A": ["Center A1", "Center A2"],
  "Region B": ["Center B1", "Center B2"],
  "Region C": ["Center C1", "Center C2"],
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SendParcel = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: "Prefilled Name",
    },
  });

  const [formData, setFormData] = useState(null);

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const calculateCost = (data) => {
    let cost = data.type === "document" ? 50 : 100;
    if (data.type === "non-document" && data.weight) cost += Number(data.weight) * 10;
    if (data.senderServiceCenter) cost += 20;
    if (data.receiverServiceCenter) cost += 20;
    return cost;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setFormData(data);
    toast.info(
      <div className="flex items-center space-x-4">
        <span>
          Delivery cost: <b>${cost.toFixed(2)}</b>
        </span>
        <button onClick={handleConfirm} className="btn btn-sm btn-primary">
          Confirm
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleConfirm = () => {
    const parcelWithDate = { ...formData, creation_date: new Date().toISOString() };
    console.log("Saving to DB:", parcelWithDate);
    toast.dismiss();
    toast.success("Parcel info saved successfully!");
  };

  return (
   <div
  className="min-h-screen mb-10 mt-10 flex items-center justify-center p-6 bg-gradient-to-br from-lime-50 via-lime-100 to-lime-200"
>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl w-full bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-10 space-y-12"
      >
        <motion.h1
          className="text-5xl font-extrabold text-center text-gradient mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          Send a Parcel
        </motion.h1>
        <motion.p
          className="text-center text-gray-700 max-w-3xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          Fill in the details below to send your parcel quickly and securely.
        </motion.p>

        {/* Parcel Info */}
        <motion.section
          className="bg-white rounded-xl shadow-md border border-gray-300 p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(102, 126, 234, 0.4)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
            Parcel Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="type" className="block font-medium mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                {...register("type", { required: "Parcel type is required" })}
                className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              >
                <option value="">Select type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-document</option>
              </select>
              {errors.type && <p className="text-red-500 mt-1">{errors.type.message}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                placeholder="Parcel title"
              />
              {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            {type === "non-document" && (
              <div>
                <label htmlFor="weight" className="block font-medium mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  step="0.01"
                  {...register("weight", {
                    min: { value: 0, message: "Weight must be positive" },
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Parcel weight"
                />
                {errors.weight && <p className="text-red-500 mt-1">{errors.weight.message}</p>}
              </div>
            )}
          </div>
        </motion.section>

        {/* Sender & Receiver Info */}
        <div className="flex flex-col lg:flex-row lg:space-x-10 gap-10">
          {/* Sender */}
          <motion.section
            className="bg-white rounded-xl shadow-md border border-gray-300 p-8 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(118, 75, 162, 0.4)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
              Sender Info
            </h2>

            <div className="space-y-5">
              {/* inputs same as before, just add focus:ring and transition */}
              <div>
                <label htmlFor="senderName" className="block font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="senderName"
                  type="text"
                  {...register("senderName", { required: "Name is required" })}
                  className="w-full input input-bordered bg-gray-100 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="senderContact" className="block font-medium mb-1">
                  Contact <span className="text-red-500">*</span>
                </label>
                <input
                  id="senderContact"
                  type="tel"
                  {...register("senderContact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9\-+() ]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Phone number"
                />
                {errors.senderContact && (
                  <p className="text-red-500 mt-1">{errors.senderContact.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="senderRegion" className="block font-medium mb-1">
                  Select Region <span className="text-red-500">*</span>
                </label>
                <select
                  id="senderRegion"
                  {...register("senderRegion", { required: "Region is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                >
                  <option value="">Select region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 mt-1">{errors.senderRegion.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="senderServiceCenter" className="block font-medium mb-1">
                  Select Service Center <span className="text-red-500">*</span>
                </label>
                <select
                  id="senderServiceCenter"
                  {...register("senderServiceCenter", {
                    required: "Service Center is required",
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  disabled={!senderRegion}
                >
                  <option value="">
                    {senderRegion ? "Select service center" : "Select region first"}
                  </option>
                  {senderRegion &&
                    serviceCenters[senderRegion].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {errors.senderServiceCenter && (
                  <p className="text-red-500 mt-1">{errors.senderServiceCenter.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="senderAddress" className="block font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="senderAddress"
                  {...register("senderAddress", { required: "Address is required" })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Pickup address"
                  rows={3}
                />
                {errors.senderAddress && (
                  <p className="text-red-500 mt-1">{errors.senderAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="pickupInstruction" className="block font-medium mb-1">
                  Pickup Instruction <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pickupInstruction"
                  {...register("pickupInstruction", {
                    required: "Pickup instruction is required",
                  })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Pickup instructions"
                  rows={3}
                />
                {errors.pickupInstruction && (
                  <p className="text-red-500 mt-1">{errors.pickupInstruction.message}</p>
                )}
              </div>
            </div>
          </motion.section>

          {/* Receiver */}
          <motion.section
            className="bg-white rounded-xl shadow-md border border-gray-300 p-8 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(107, 141, 214, 0.4)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
              Receiver Info
            </h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="receiverName" className="block font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="receiverName"
                  type="text"
                  {...register("receiverName", { required: "Name is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Receiver name"
                />
                {errors.receiverName && (
                  <p className="text-red-500 mt-1">{errors.receiverName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="receiverContact" className="block font-medium mb-1">
                  Contact <span className="text-red-500">*</span>
                </label>
                <input
                  id="receiverContact"
                  type="tel"
                  {...register("receiverContact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9\-+() ]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Phone number"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 mt-1">{errors.receiverContact.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="receiverRegion" className="block font-medium mb-1">
                  Select Region <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiverRegion"
                  {...register("receiverRegion", { required: "Region is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                >
                  <option value="">Select region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500 mt-1">{errors.receiverRegion.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="receiverServiceCenter" className="block font-medium mb-1">
                  Select Service Center <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiverServiceCenter"
                  {...register("receiverServiceCenter", {
                    required: "Service Center is required",
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  disabled={!receiverRegion}
                >
                  <option value="">
                    {receiverRegion ? "Select service center" : "Select region first"}
                  </option>
                  {receiverRegion &&
                    serviceCenters[receiverRegion].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {errors.receiverServiceCenter && (
                  <p className="text-red-500 mt-1">{errors.receiverServiceCenter.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="receiverAddress" className="block font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="receiverAddress"
                  {...register("receiverAddress", { required: "Address is required" })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Delivery address"
                  rows={3}
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 mt-1">{errors.receiverAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="deliveryInstruction" className="block font-medium mb-1">
                  Delivery Instruction <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="deliveryInstruction"
                  {...register("deliveryInstruction", {
                    required: "Delivery instruction is required",
                  })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Delivery instructions"
                  rows={3}
                />
                {errors.deliveryInstruction && (
                  <p className="text-red-500 mt-1">{errors.deliveryInstruction.message}</p>
                )}
              </div>
            </div>
          </motion.section>
        </div>

        <motion.button
          type="submit"
          className="btn bg-lime-400 text-black w-full py-4 text-lg font-semibold mt-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 12px 25px rgba(102, 126, 234, 0.6)" }}
        >
          Submit
        </motion.button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default SendParcel;
