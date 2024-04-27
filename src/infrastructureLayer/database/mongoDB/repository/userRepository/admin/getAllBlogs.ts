import BlogModel from "../../../models/blogModel";

export const getAllBlogs = async () => {
  try {
    const allBlogs = await BlogModel.find()
      .select("title author banner isBlocked title publishedAt")
      .populate({
        path: "author",
        select: "personal_info.username personal_info.email personal_info._id",
      });

    return allBlogs;
  } catch (error) {
    throw error;
  }
};
