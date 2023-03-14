import mongoose from "mongoose";
import { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    ConversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Message", MessageSchema);