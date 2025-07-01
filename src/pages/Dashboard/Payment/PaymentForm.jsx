import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner text-success"></span>;
  }

  const amount = parcelInfo.cost || 0;
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    setError("");

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: parcelInfo?.sender_name || "Anonymous",
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!", result);
        // TODO: Optional - Update backend to mark parcel as paid
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 max-w-md mx-auto rounded bg-white shadow-md w-full"
      >
        <CardElement className="p-2 border rounded" options={{ hidePostalCode: true }} />
        <button
          className="btn w-full mt-4 bg-lime-400 text-black"
          type="submit"
          disabled={!stripe || !parcelInfo.cost}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
