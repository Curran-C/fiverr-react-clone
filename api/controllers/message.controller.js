import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";
import Message from "../models/message.modal.js";
import Conversation from "../models/conversation.modal.js";

export const createMessage = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not Authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    try {
      const user = await User.findById(payload.id);
      const newMessage = new Message({
        conversationId: req.body.conversationId,
        userId: user._id,
        desc: req.body.desc,
      });

      try {
        const savedMessage = await newMessage.save();
        await Conversation.findOneAndUpdate(
          { id: req.body.conversationId },
          {
            $set: {
              readBySeller: user.isSeller,
              readByBuyer: !user.isSeller,
              lastMessage: req.body.desc,
            },
          },
          { new: true }
        );
        res.status(201).send(savedMessage);
      } catch (err) {
        res.send(err);
      }
    } catch (err) {
      res.send(err);
    }
  });
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    res.send(err);
  }
};
