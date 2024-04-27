import UserModel from "../../../models/userModel";

export const listUserFollowers = async (
  userId: string,
  userModel: typeof UserModel
): Promise<any | void> => {
  try {
    const user = await userModel
      .findById(userId)
      .populate(
        "followers",
        "personal_info.profile_img personal_info.username _id"
      );

    if (!user) {
      console.log("User not found.");
      return { success: false, message: "User not found." };
    }

    return user.followers;
  } catch (error) {
    throw error;
  }
};
