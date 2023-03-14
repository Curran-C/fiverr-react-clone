import axios from "axios";
import React, { useEffect, useState } from "react";
import Review from "../Review/Review";

import "./Reviews.scss";
const Reviews = ({ gigId }) => {
  //state variables
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(`http://localhost:8800/api/reviews/${gigId}`);
      setReviews(res.data);
    };
    getReviews();
  }, []);

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <Review review={review} key={review._id} />
      ))}
    </div>
  );
};

export default Reviews;
