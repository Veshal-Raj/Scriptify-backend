import mongoose, { Model, Schema } from "mongoose";

import { IChat } from "../../../../entitiesLayer/chat";

const chatSchema: Schema<IChat> = new Schema<IChat>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const ChatModel: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default ChatModel;
