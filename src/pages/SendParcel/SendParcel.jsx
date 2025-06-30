import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
        <div style="margin-bottom:10px;">
          <span style="font-weight:bold; color:#444;">\uD83D\uDCE6 Parcel Type:</span> <span>${typeLabel}</span><br/>
          <span style="font-weight:bold; color:#444;">⚖️ Weight:</span> <span>${weight} kg</span><br/>
          <span style="font-weight:bold; color:#444;">📍 Delivery Zone:</span> <span>${zone}</span>
        </div>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;"/>
        <div style="margin-bottom:10px;">
          <span style="font-weight:bold; color:#444;">\uD83D\uDCB0 Base Cost:</span> <span>৳${baseCost}</span><br/>
          <span style="font-weight:bold; color:#444;">➕ Extra Charges:</span> <span>৳${extraCharge} (${extraCharge > 0 ? 'Weight exceeds 3kg' : 'No extra charge'})</span><br/>
          <span style="font-weight:bold; color:#444;">📘 Pricing Note:</span> <span>${conditionNote}</span>
        </div>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;"/>
        <div style="margin-top:10px;">
          <span style="font-size:18px; font-weight:bold;">\uD83D\uDCB5 Total Cost: 
            <span style="color:green;">৳${totalCost}</span>
          </span>
        </div>
      </div>
    `;

    const result = await MySwal.fire({
      title: "Delivery Cost Breakdown",
      html: breakdownHTML,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back to Edit",
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
        tracking_history: [
          {
            status: "pending",
            timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
            note: "Parcel created",
          },
        ],
      };

      console.log("Saving Parcel:", parcelData);

      axiosSecure.post('/parcels', parcelData)
      .then(res =>{
        console.log(res.data);
        if(res.data.insertedId){
          //  TODO : redirect to a payment page
          MySwal.fire({
            title: "Redirecting...",
            text: "Proceeding to payment gateway.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        }
      })


      
    }
  };

  // (Rest of the form UI remains unchanged and continues below...)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center">Send a Parcel</h2>
      <p className="text-center text-gray-500 mb-6">
        Fill in the required details to submit your parcel
      </p>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📦 Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="input input-bordered w-full"
            />
            {parcelType === "non-document" && (
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
              />
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">🧑‍💼 Sender Info</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={senderName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="text"
                {...register("sender_contact", { required: true })}
                placeholder="Contact Number"
                className="input input-bordered w-full"
              />
              <select
                {...register("sender_region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("sender_district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {senderDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <select
                {...register("sender_service_center", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Area</option>
                {senderWarehouses.map((area, idx) => (
                  <option key={idx} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <input
                type="text"
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
          <div>
            <h3 className="text-lg font-semibold mb-2">🏠 Receiver Info</h3>
            <div className="space-y-4">
              <input
                type="text"
                {...register("receiver_name", { required: true })}
                placeholder="Receiver Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                {...register("receiver_contact", { required: true })}
                placeholder="Contact Number"
                className="input input-bordered w-full"
              />
              <select
                {...register("receiver_region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("receiver_district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {receiverDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <select
                {...register("receiver_service_center", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Area</option>
                {receiverWarehouses.map((area, idx) => (
                  <option key={idx} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <input
                type="text"
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
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="btn bg-lime-400 text-black w-full rounded-2xl px-10"
          >
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
