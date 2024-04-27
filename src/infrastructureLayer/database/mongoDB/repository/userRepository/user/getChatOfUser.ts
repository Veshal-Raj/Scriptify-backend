import Message from "../../../models/messageModel";

export const getChatOfUser = async (senderId: string, receiverId: string) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "personal_info.username personal_info.profile_img")
      .populate("receiver", "personal_info.username personal_info.profile_img");

    const formattedMessages = messages.map((message) => ({
      sender: {
        id: message.sender._id,
        name: message.sender.personal_info.username,
        profile_img: message.sender.personal_info.profile_img,
      },
      receiver: {
        id: message.receiver._id,
        name: message.receiver.personal_info.username,
        profile_img: message.receiver.personal_info.profile_img,
      },
      message: message.content,
      time: message.createdAt,
    }));

    return formattedMessages;
  } catch (error) {
    throw error;
  }
};
