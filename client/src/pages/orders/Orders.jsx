import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// css
import "./Orders.scss";

const Orders = () => {
  // variables
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //states
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/order/", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getOrder();
  }, []);

  //functions
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversation/single/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        console.log("status 404");
        try {
          const res = await axios.post(
            `http://localhost:8800/api/conversation`,
            {
              to: currentUser.isSeller ? buyerId : sellerId,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          navigate(`/message/${res.data.id}`);
        } catch (err) {
          console.log(err.response.data);
        }
      }
    }
  };

  return (
    <div className="orders">
      <div className="container">
        {/* title */}
        <h1 className="title">Orders</h1>

        {/* table */}
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={order.img} alt="" className="image" />
              </td>
              <td>{order.title}</td>
              <td>{order.price}</td>
              <td></td>
              <td>
                <img
                  className="message"
                  src="/img/message.png"
                  alt=""
                  onClick={() => handleContact(order)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
