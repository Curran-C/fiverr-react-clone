// packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// routes
import userRoute from "../api/routes/user.route.js";
import conversationRoute from "../api/routes/conversation.route.js";
import gigRoute from "../api/routes/gig.route.js";
import messageRoute from "../api/routes/user.route.js";
import orderRoute from "../api/routes/order.route.js";
import reviewsRoute from "../api/routes/reviews.route.js";
import authRoute from "../api/routes/auth.route.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err);
  }
};

//(middleware)
app.use(express.json()); //letting application accept input from front end
app.use(cookieParser()); //letting broswer use and save cookies
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true })); //removes cors error, allows backend to be accessed from different port, credentials: true allows cookies to be used

//routes
app.use("/api/users", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/order", orderRoute);
app.use("/api/gig", gigRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
  connect();
  console.log("Backend server has started on port 8800");
});
