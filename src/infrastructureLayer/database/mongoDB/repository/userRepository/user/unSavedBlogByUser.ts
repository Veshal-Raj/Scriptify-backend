import UserModel from "../../../models/userModel";

export const unSavedBlogByUser = async (
  blog_id: string,
  userId: string,
  userModel: typeof UserModel
): Promise<any | void> => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found.");
      return { success: false, message: "User not found." };
    }

    const savedBlogIndex = user.userInteractions.userSavedBlogs.findIndex(
      (blog) => String(blog.blogId) === blog_id
    );

    if (savedBlogIndex === -1) {
      console.log("User has not saved the blog.");
      return { success: false, message: "User has not saved the blog." };
    }

    // Remove the blog from the user's saved blogs list
    user.userInteractions.userSavedBlogs.splice(savedBlogIndex, 1);
    await user.save();

    return { success: true, message: "Blog unsaved successfully." };
  } catch (error) {
    throw error;
  }
};
