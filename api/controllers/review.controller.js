import jwt from "jsonwebtoken";
import Review from "../models/review.modal.js";
import User from "../models/user.modal.js";
import Gig from "../models/gig.modal.js";

export const createReview = async (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const user = await User.findById(payload.id);
      if (user.isSeller)
        res.status(402).send("You cant leave a review as a seller");
      const newReview = new Review({
        userId: user._id,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
      });
      const review = await Review.findOne({
        gigId: req.body.gigId,
        userId: user._id,
      });
      if (review) res.status(403).send("You have already created a review");
      await Gig.findByIdAndUpdate(req.body.gigId, {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      });
      const savedReview = await newReview.save();
      res.status(201).send(savedReview);
    } catch (err) {
      res.status(500).send(err.response.data);
    }
  });
};
export const getReview = async (req, res) => {
  try {
    const review = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(review);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
export const deleteReview = (req, res) => {};
