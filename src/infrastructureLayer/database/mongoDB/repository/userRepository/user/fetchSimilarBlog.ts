import BlogModel from "../../../models/blogModel";

export const fetchSimilarBlog = async (
  tags: string[],
  blogModels: typeof BlogModel
) => {
  try {
    const similarBlogs = await blogModels.aggregate([
      {
        $match: {
          tags: { $in: tags },
        },
      },
      {
        $project: {
          _id: 1,
          blog_id: 1,
          title: 1,
          banner: 1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    return similarBlogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
