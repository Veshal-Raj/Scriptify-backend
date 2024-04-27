import BlogModel from "../../../models/blogModel";

export const searchByQuery = async (
  query: string,
  blogModels: typeof BlogModel
) => {
  try {
    const blogs = await blogModels.find(
      {
        $or: [
          { title: { $regex: query, $options: "i" } }, // Match title
          { tags: { $in: [query] } }, // Match tags
        ],
      },
      { title: 1, blog_id: 1 }
    );

    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
