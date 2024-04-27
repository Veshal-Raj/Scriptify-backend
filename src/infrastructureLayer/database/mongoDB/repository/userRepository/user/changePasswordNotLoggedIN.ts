import UserModel from "../../../models/userModel";

export const changePasswordNotLoggedIN = async (
  email: string,
  newPassword: string
) => {
  try {
    const user = await UserModel.findOne({ "personal_info.email": email });
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
