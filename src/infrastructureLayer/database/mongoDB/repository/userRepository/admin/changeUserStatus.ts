import IUser from "../../../../../../entitiesLayer/user";
import UserModel from "../../../models/userModel";

export const changeUserStatus = async (
  userId: string
): Promise<IUser | null> => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) return null;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isVerified: !user.isVerified } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
