import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./GigCard.scss";
const GigCard = ({ item, page }) => {
  //states
  const [user, setUser] = useState([]);

  //hooks
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/${item.userId}`
        );
        setUser(res.data);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <Link to={`/gig/${page}`} className="link">
      <div className="gigCard">
        <div className="containerCard">
          <img className="gigImage" src={item.images[0]} alt="" />
          <div className="wrapper">
            <div className="info">
              <img src={user.img || "/img/noavatar.png"} alt="" />
              <p>{user.username}</p>
            </div>

            <p>{item.title}</p>
            <p>{item.shortDesc}</p>

            <div className="stars">
              <img src="img/star.png" alt="" />
              <p>
                {!isNaN(Math.round(item.totalStars / item.starNumber))
                  ? Math.round(item.totalStars / item.starNumber)
                  : 0}
              </p>
            </div>

            <hr />

            <div className="details">
              <img src="img/heart.png" alt="" />
              <div className="price">
                <span>STARTING AT:</span>
                <h2>₹{item.price}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
