import UserModel from "../../../models/userModel";

export const findUserByEmail = async (email: string) => {
  try {
    const existingUser = await UserModel.findOne({
      "personal_info.email": email,
    });

    if (existingUser !== null && existingUser?.isVerified === false)
      throw new Error("User is blocked!!!");
    else return existingUser;
  } catch (error) {
    throw error;
  }
};
