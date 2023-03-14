import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Review.scss";
const Review = ({ review }) => {
  //states and variables
  const [user, setUser] = useState([]);

  //hooks
  useEffect(() => {
    const getUser = async () => {
      const { userId } = review;
      const res = await axios.get(`http://localhost:8800/api/users/${userId}`);
      setUser(res.data);
    };
    getUser();
  }, []);

  //return
  return (
    <div className="review">
      <div className="user">
        <img className="pp" src={user.img} alt="" />
        <div className="info">
          <span>{user.username}</span>
          <div className="country">
            <img
              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
              alt=""
            />
            <span>{user.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        <img src="/img/star.png" alt="" />
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
      <hr />
    </div>
  );
};

export default Review;
