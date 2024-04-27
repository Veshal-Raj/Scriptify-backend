import UserModel from "../../../models/userModel";

export const registerToken = async (token: string, userId: string) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found");

    user.NotificationToken = token;

    await user.save();

    console.log("Token registered successfully");
  } catch (error) {
    console.error("Error registering token:", error);
  }
};
