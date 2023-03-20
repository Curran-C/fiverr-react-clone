import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  console.log(payment_intent);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.put(`http://localhost:8800/api/order/`, { payment_intent });
        setTimeout(() => {
          navigate("/order");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="success">
      Payment successful, you are being redirected to the orders page, please do
      not close this page
    </div>
  );
};

export default Success;
