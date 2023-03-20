import jwt from "jsonwebtoken";
import Order from "../models/order.modal.js";
import Gig from "../models/gig.modal.js";
import User from "../models/user.modal.js";
import Stripe from "stripe";

// export const createOrder = async (req, res) => {
//   const token = req.cookies.accessToken;
//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//     if (!payload) res.send("You are not autherised");
//     try {
//       const user = User.findById(payload.id);
//       const gig = await Gig.findById(req.params.gigId);
//       const newOrder = new Order({
//         gigId: gig._id,
//         img: gig.cover,
//         title: gig.title,
//         buyerId: payload.id,
//         sellerId: gig.userId,
//         price: gig.price,
//         payment_intent: "temp_string",
//       });

//       await newOrder.save();
//       res.status(200).send("Successful");
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
// };

export const getOrders = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  else
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      try {
        const user = await User.findById(payload.id);
        const order = await Order.find({
          ...(user.isSeller ? { sellerId: user.id } : { buyerId: user.id }),
          isCompleted: true,
        });
        res.status(200).send(order);
      } catch (err) {
        res.status(500).send(err);
      }
    });
};

export const intent = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const gig = await Gig.findById(req.params.id);
      const user = await User.findById(payload.id);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: user._id,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
      });

      await newOrder.save();
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      // res.send(err);
    }
  });
};

export const confirm = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const order = await Order.findOneAndUpdate(
        { payment_intent: req.body.payment_intent },
        {
          $set: {
            isCompleted: true,
          },
        }
      );
      res.send("Order has been confirmed.");
    } catch (err) {
      res.send(err);
    }
  });
};
