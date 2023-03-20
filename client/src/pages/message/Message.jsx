import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Message.scss";
const Message = () => {
  //states and hooks
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  //variables
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //useEffect
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/message/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setMessages(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getMessages();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/message",
        {
          conversationId: id,
          desc: e.target[0].value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      e.target[0].value = "";
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="message">
      <div className="container">
        {/* bread crumbs */}
        <div className="breadcrumbs">
          <Link to="/messages" className="link">
            MESSAGES{" "}
          </Link>{" "}
          {">"} JOHN DOE {">"}
        </div>

        {/* messages */}
        <div className="messages">
          {messages.map((message) => (
            <div
              className={
                message.userId === currentUser._id ? "owner item" : "item"
              }
              key={message._id}
            >
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>{message.desc}</p>
            </div>
          ))}
        </div>

        <hr />
        {/* textbox and send button */}
        <form onSubmit={handleSubmit} className="write">
          <textarea
            name=""
            id=""
            placeholder="Write a message.."
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
