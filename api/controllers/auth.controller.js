import User from "../models/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("New user registered");
  } catch (err) {
    res.status(500).send(err);
  }
};
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send("Username doesnt exist");
    } else {
      const isCorrectPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isCorrectPassword)
        return next(createError(400, "Wrong password or username!"));
      //generates token than will then then be passed as cookie
      const token = jwt.sign(
        {
          id: user._id,
          isSeller: user.isSeller,
        },
        process.env.JWT_KEY
      );

      const { password, ...info } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true, //generates cookie with accessToken as it's name and token variable as its value with httpOnly rule
        })
        .status(200)
        .send(info);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })  
    .status(200)
    .send("User has been logged out");
};
