import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Review from "../Review/Review";

import "./Reviews.scss";
const Reviews = ({ gigId }) => {
  //state variables
  const [reviews, setReviews] = useState([]);

  //hooks
  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(`http://localhost:8800/api/reviews/${gigId}`);
      setReviews(res.data);
    };
    getReviews();
  }, []);

  //functions
  const updateReview = async (desc, star) => {
    try {
      const res = await axios.post("http://localhost:8800/api/reviews", {
        gigId,
        star,
        desc,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    updateReview(star, desc);
  };

  //return
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <Review review={review} key={review._id} />
      ))}
      <div className="add">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" name="" id="" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
