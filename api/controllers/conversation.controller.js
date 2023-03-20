import Conversation from "../models/conversation.modal.js";
import User from "../models/user.modal.js";
import jwt from "jsonwebtoken";

//creating convo
export const createConversation = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const user = await User.findById(payload.id);
      const conversation = new Conversation({
        id: user.isSeller ? user._id + req.body.to : req.body.to + user._id,
        sellerId: user.isSeller ? user._id : req.body.to,
        buyerId: user.isSeller ? req.body.to : user._id,
        readBySeller: user.isSeller,
        readByBuyer: !user.isSeller,
      });

      const savedConversation = await conversation.save();
      res.status(200).send(savedConversation);
    } catch (err) {
      res.status(500).send(err);
    }
  });
};

//update convo

export const updateConversation = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const user = await User.findById(payload.id);
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            // readBySeller: true,
            // readByBuyer: true,
            ...(user.isSeller ? { readBySeller: true } : { readByBuyer: true }),
          },
        },
        { new: true }
      );
      res.status(200).send(updatedConversation);
    } catch (err) {
      res.send(err);
    }
  });
};

//get convos
export const getConversations = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const user = await User.findById(payload.id);
      const conversations = await Conversation.find(
        user.isSeller ? { sellerId: user._id } : { buyerId: user._id }
      );
      res.status(200).send(conversations);
    } catch (err) {
      res.send(err);
    }
  });
};

//get single convo

export const getSingleConversation = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) res.status(404).send("Convo not found");
      res.send(conversation);
    } catch (err) {}
  });
};
