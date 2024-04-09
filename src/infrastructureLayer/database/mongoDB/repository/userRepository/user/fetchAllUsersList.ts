import Message from "../../../models/messageModel";
import UserModel from "../../../models/userModel";



export const fetchAllUsersList = async () => {
    try {
        // Fetch all users from the database
        const users = await UserModel.find();

        // Create an array to store user objects with required information
        const userList = [];

        // Loop through each user
        for (const user of users) {
            // Fetch the latest message for the user (if available)
            const latestMessage = await Message.findOne({ sender: user._id }).sort({ createdAt: -1 });

            // Calculate user online status (you need to implement this logic based on your requirements)
            const isOnline = true; // Example: Set to true for demonstration purposes

            // Construct user object with required information
            const userObj = {
                userId: user._id,
                username: user.personal_info.username,
                lastMessage: latestMessage ? latestMessage.content : '', // Get content of latest message or empty string
                time: latestMessage ? latestMessage.createdAt : null, // Get timestamp of latest message or null
                online: isOnline,
                profileImage: user.personal_info.profile_img,
            };

            // Add user object to the user list
            userList.push(userObj);
        }

        // Return the array of user objects
        return userList;
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; 
    }   
}