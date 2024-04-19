import BlogModel from "../../../models/blogModel";

export const getAllBlogs = async () => {
    try {
        // Query to fetch all blogs and select specific fields
        const allBlogs = await BlogModel.find()
            .select('title author banner isBlocked title publishedAt')
            .populate({
                path: 'author',
                select: 'personal_info.username personal_info.email personal_info._id'
            }); // Populate author field with 'name' field from 'User' model

            // console.log('all blogs in repo engine --- ', allBlogs)
        return allBlogs; // Return the fetched blogs with selected fields
    } catch (error) {
        throw error;
    }
};
