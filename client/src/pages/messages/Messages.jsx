import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./Messages.scss";
const Messages = () => {
  //variables
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //states
  const [messages, setMessages] = useState([]);
  //useEffect
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversation", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getConversations();
  }, []);

  const handleRead = async (id) => {
    try {
      await axios.put(`http://localhost:8800/api/conversation/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="messages">
      <div className="container">
        {/* title */}
        <h1 className="title">Messages</h1>

        {/* table */}
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {messages.map((message) => (
            <tr
              className={
                (currentUser.isSeller && !message.readBySeller) ||
                (!currentUser.isSeller && !message.readByBuyer && "active")
              }
              key={message._id}
            >
              <td>
                {currentUser.isSeller ? message.buyerId : message.sellerId}
              </td>
              <td>
                <Link to={`/message/${message.id}`} className="link">
                  {message?.lastMessage?.substring(0, 100)}...
                </Link>
              </td>
              <td>{moment(message.updatedAt).fromNow()}</td>
              <td>
                {(currentUser.isSeller && !message.readBySeller) ||
                  (!currentUser.isSeller && !message.readByBuyer && (
                    <button onClick={() => handleRead(message.id)}>
                      Mark as read
                    </button>
                  ))}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Messages;
