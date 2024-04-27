import BlogModel from "../../../models/blogModel";

export const filteredByTag = async (
  tag: string,
  blogModels: typeof BlogModel
) => {
  try {
    // Create a new instance of BlogModel
    let findTag = { tags: tag, draft: false };
    const maxLimit = 5;
    const blogs = await blogModels
      .find(findTag)
      .populate(
        "author",
        "personal_info.profile_img personal_info.username -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .limit(maxLimit);

    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
