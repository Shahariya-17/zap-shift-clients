import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const {parcelId} = useParams();
  const axiosSecure = useAxiosSecure();
  

  const {isPending, data: parcelInfo = {}} = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/parcels/${parcelId}`);
        return res.data;
    }

  })

  if(isPending){
    return <span className="loading loading-spinner text-success"></span>
  }
  console.log(parcelInfo);
  const amount = parcelInfo.cost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
        setError('');
      console.log("Payment method", paymentMethod);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 max-w-md mx-auto rounded bg-white shadow-md w-full"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          className="btn w-full mt-4 bg-lime-400 text-black"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {
            error && <p className="text-center text-red-500">{error}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
