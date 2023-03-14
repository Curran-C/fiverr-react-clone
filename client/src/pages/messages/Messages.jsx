import React from "react";
import { Link } from "react-router-dom";

import "./Messages.scss";
const Messages = () => {
  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aspernatur dolorem iusto recusandae facilis fuga asperiores ut quod nesciunt quaerat dicta fugiat tenetur, molestias, alias maiores placeat in explicabo consequuntur.`;

  return (
    <div className="messages">
      <div className="container">
        {/* title */}
        <h1 className="title">Messages</h1>

        {/* table */}
        <table>
          <tr>
            <th>Buyer</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="active">
            <td>John Doe</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>Mark as read</button>
            </td>
          </tr>
          <tr className="active">
            <td>John Doe</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>Mark as read</button>
            </td>
          </tr>
          <tr className="active">
            <td>John Doe</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>Mark as read</button>
            </td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>Mark as read</button>
            </td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>Mark as read</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Messages;
