import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gigModal from "../../../../api/models/gig.modal";

// css
import "./MyGigs.scss";

const MyGigs = () => {
  //states and vars
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    const getGigs = async () => {
      try {
        const gigs = await axios.get(
          `http://localhost:8800/api/gig/gigs?userId=${currentUser._id}`
        );
        setGigs(gigs.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGigs();
  }, []);

  //functions
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/gig/delete/${id}`);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const getGig = async (id) => {
    navigate(`/gig/${id}`);
  };

  //return
  return (
    <div className="myGigs">
      <div className="container">
        {/* title */}
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add" className="link">
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
          {gigs.map((gig) => (
            <tr key={gig._id}>
              <td>
                <img
                  src={gig.cover}
                  alt=""
                  className="image"
                  onClick={() => getGig(gig._id)}
                />
              </td>
              <td>{gig.title}</td>
              <td>{gig.price}</td>
              <td>{gig.sales}</td>
              <td>
                <img
                  className="delete"
                  src="/img/delete.png"
                  alt=""
                  onClick={() => handleDelete(gig._id)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
