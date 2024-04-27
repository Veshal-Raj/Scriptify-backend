import BlogModel from "../../../models/blogModel";

export const changeBlogStatus = async (blogId: string) => {
  try {
    const blog = await BlogModel.findById(blogId);

    // If the blog is found
    if (blog) {
      // Reverse the value of isBlocked
      const updatedStatus = !blog.isBlocked;

      // Update the blog's isBlocked status
      await BlogModel.findByIdAndUpdate(blogId, { isBlocked: updatedStatus });

      return updatedStatus;
    } else {
      throw new Error("Blog not found");
    }
  } catch (error) {
    throw error;
  }
};
