import BlogModel from "../../../models/blogModel";
import UserModel from "../../../models/userModel";

export const savedBlogsByUser = async (
  userId: string,
  userModel: typeof UserModel,
  blogModel: typeof BlogModel
): Promise<any | void> => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found.");
      return { success: false, message: "User not found." };
    }

    const savedBlogIds = user.userInteractions.userSavedBlogs.map(
      (blog) => blog.blogId
    );

    // Find the blog documents corresponding to the savedBlogIds
    const savedBlogs = await blogModel
      .find({ _id: { $in: savedBlogIds } })
      .select(
        "_id blog_id title banner activity.total_likes des tags author publishedAt"
      )
      .populate(
        "author",
        "personal_info.profile_img personal_info.username -_id"
      );

    return savedBlogs;
  } catch (error) {
    throw error;
  }
};
