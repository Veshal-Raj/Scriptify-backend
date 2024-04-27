import BlogModel from "../../../models/blogModel";

export const latestBlogs = async (
  page: number,
  blogModels: typeof BlogModel
) => {
  try {
    const maxLimit = 5;
    const skipCount = (page - 1) * maxLimit;
    const blogs = await blogModels
      .find({ draft: false, isBlocked: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .skip(skipCount)
      .limit(maxLimit);

    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
