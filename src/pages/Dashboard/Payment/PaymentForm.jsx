import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');

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
          Pay for parcel pickup
        </button>
        {
            error && <p className="text-center text-red-500">{error}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
