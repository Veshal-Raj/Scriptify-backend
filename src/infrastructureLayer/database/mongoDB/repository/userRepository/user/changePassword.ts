import UserModel from "../../../models/userModel";

export const changePassword = async (userId: string, newPassword: string) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.personal_info.password = newPassword;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};
