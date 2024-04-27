import UserModel from "../../../models/userModel";

export const initialLikebyUser = async (
  userId: string,
  blog_id: string,
  userModel: typeof UserModel
): Promise<any | void> => {
  try {
    const user = await userModel.findById(userId);

    const isLiked = user?.userInteractions.userLikedBlogs.some(
      (likedBlog) => likedBlog.blogId.toString() === blog_id
    );

    // Check if the blog is saved by the user
    const isSaved = user?.userInteractions.userSavedBlogs.some(
      (savedBlog) => savedBlog.blogId.toString() === blog_id
    );

    return { isLiked: isLiked, isSaved: isSaved };
  } catch (error) {
    throw error;
  }
};
