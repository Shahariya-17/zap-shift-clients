import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

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

    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    setError("");

    try {
      // Step-2 : create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      //   Step-3: Confirm payment

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!", result);
          const transactionId =  result.paymentIntent.id;

          // Step-5: Mark parcel paid also created payment history
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            await MySwal.fire({
              title: "✅ Payment Successful!",
              html: `<p class="text-lg">Transaction ID:</p><code>${transactionId}</code>`,
              icon: "success",
              confirmButtonColor: "#16a34a",
              confirmButtonText: "Go to My Parcels",
            });

            // Redirect
            navigate("/dashboard/myParcels");
          }
        }
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
        <CardElement
          className="p-2 border rounded"
          options={{ hidePostalCode: true }}
        />
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
