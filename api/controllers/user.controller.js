import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  // getting token from cookie
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated!");

  // checking if userid in the token matches logged in userid
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (payload.id !== user?._id.toString()) {
      return res.status(403).send("You can only delete your account");
    } else {
      await User.findByIdAndDelete(req.params.id);
      return res.send("Deleted");
    }
  });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};
