import React from "react";
import { Link } from "react-router-dom";

// css
import "./MyGigs.scss";

const MyGigs = () => {
  return (
    <div className="myGigs">
      <div className="container">
        {/* title */}
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/" className="link">
            <button>Add new Gig</button>
          </Link>
        </div>

        {/* table */}
        <table>
        <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
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
            <td>123</td>
            <td>
              <img className="delete" src="/img/delete.png" alt="" />
            </td>
          </tr><tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img className="delete" src="/img/delete.png" alt="" />
            </td>
          </tr><tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img className="delete" src="/img/delete.png" alt="" />
            </td>
          </tr><tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img className="delete" src="/img/delete.png" alt="" />
            </td>
          </tr><tr>
            <td>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="image"
              />
            </td>
            <td>Gig 1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img className="delete" src="/img/delete.png" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
