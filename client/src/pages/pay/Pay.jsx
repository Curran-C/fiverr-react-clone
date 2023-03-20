import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

//css
import "./Pay.scss";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

//variables
const stripePayment = loadStripe(
  "pk_test_51Ky9SHSA3SsI6LovIvZvTXPTNuNRYNOHl1AMG9iVcZFVZz6fEXQEdHrvMbzLp8om2OFHHaBSoX1WNRVJBprORxfZ002EBaAkAt"
);

const Pay = () => {
  //states and vars
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  //useeffect
  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8800/api/order/create-payment-intent/${id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makePayment();
  }, []);

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePayment}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
