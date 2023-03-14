import React from "react";

// css
import "./Orders.scss";

const Orders = () => {
  // variables
  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
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
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>John Doe</td>
            <td>
              <img className="message" src="/img/message.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>John Doe</td>
            <td>
              <img className="message" src="/img/message.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>John Doe</td>
            <td>
              <img className="message" src="/img/message.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>John Doe</td>
            <td>
              <img className="message" src="/img/message.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>John Doe</td>
            <td>
              <img className="message" src="/img/message.png" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Orders;
