import Message from "../../../models/messageModel";
import UserModel from "../../../models/userModel";

export const chatUserSearch = async (query: string) => {
  try {
    const users = await UserModel.find({
      "personal_info.username": { $regex: new RegExp(query, "i") },
    });

    const userList = [];

    for (const user of users) {
      // Fetch the latest message for the user (if available)
      const latestMessage = await Message.findOne({ sender: user._id }).sort({
        createdAt: -1,
      });

      // Construct user object with required information
      const userObj = {
        userId: user._id,
        username: user.personal_info.username,
        profileImage: user.personal_info.profile_img,
        lastMessage: latestMessage ? latestMessage.content : "", // Get content of latest message or empty string
        time: latestMessage ? latestMessage.createdAt : null, // Get timestamp of latest message or null
        online: true,
      };

      // Add user object to the search results
      userList.push(userObj);
    }
    return userList;
  } catch (error) {
    throw error;
  }
};
