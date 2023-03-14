import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";
import Gig from "../models/gig.modal.js";

export const createGig = async (req, res) => {
  //verify if user is logged in using cookies
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");

  //getting details of loggedin user
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    const user = await User.findById(payload.id);
    if (!user.isSeller) res.status(403).send("Only sellers can create a gig");

    //creating new gig
    const newGig = new Gig({
      userId: payload.id,
      ...req.body,
    });

    try {
      const savedGig = await newGig.save();
      res.status(201).json(savedGig);
    } catch (err) {
      res.send(err);
    }
  });
};

export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) res.status(404).send("Gig not found");
    res.send(gig);
  } catch (err) {
    res.send(err.message);
  }
};
export const getGigs = async (req, res) => {
  const query = req.query;

  const filters = {
    ...(query.userId && { userId: query.userId }),
    ...(query.cat && { cat: query.cat }),
    ...((query.min || query.max) && {
      price: {
        ...(query.min && { $gt: query.min }),
        ...(query.max && { $lt: query.max }),
      },
    }),
    ...(query.search && { title: { $regex: query.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [query.sort]: -1 });
    res.send(gigs);
  } catch (err) {
    res.send(err);
  }
};

export const deleteGig = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.send("Please login");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const user = await User.findById(payload.id);
      if (payload.id !== user.id)
        res.status(403).send("You can only delete your gig");
      await Gig.findByIdAndDelete(req.params.id);
      res.status(200).send("Gig has been deleted");
    } catch (err) {
      res.send(err);
    }
  });
};
