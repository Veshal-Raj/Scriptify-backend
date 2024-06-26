import BlogModel from "../../../models/blogModel";

export const fetchBlog = async (
  blog_id: string,
  blogModels: typeof BlogModel
) => {
  try {
    const blog = await blogModels.findOne({ blog_id: blog_id }).populate({
      path: "author",
      select: {
        _id: 1,
        "personal_info.username": 1,
        "personal_info.bio": 1,
        "personal_info.profile_img": 1,
        social_links: 1,
      },
    });

    return blog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
