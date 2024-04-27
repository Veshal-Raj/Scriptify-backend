import UserModel from "../../../models/userModel";

export const getUserProfile = async (
  userId: string,
  userModels: typeof UserModel
): Promise<any | void> => {
  try {
    const result = await userModels
      .findById(userId)
      .select("-personal_info.password -google_auth -updatedAt -blogs ");

    return result;
  } catch (error) {
    throw error;
  }
};
