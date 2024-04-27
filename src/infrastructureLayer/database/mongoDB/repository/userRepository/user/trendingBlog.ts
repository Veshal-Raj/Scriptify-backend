import BlogModel from "../../../models/blogModel";

export const trendingBlog = async (blogModels: typeof BlogModel) => {
  try {
    const blogs = await blogModels
      .find({ draft: false, isBlocked: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username -_id"
      )
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("blog_id title publishedAt -_id")
      .limit(5);

    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
