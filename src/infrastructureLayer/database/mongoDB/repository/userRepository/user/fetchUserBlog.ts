import UserModel from "../../../models/userModel";

export const fetchUserBlog = async (
  userId: string,
  userModel: typeof UserModel
) => {
  try {
    const user = await userModel
      .findById(userId)
      .populate("blogs")
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id");

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
