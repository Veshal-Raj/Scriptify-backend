import UserModel from "../../../models/userModel";
import BlogModel from "../../../models/blogModel";



export const fetchSimilarBlog = async(
    tags: string[],
    blogModels: typeof BlogModel, 
) => {
    try {
        console.log('reached inside the repository/userRepository/user/latestBlogs');
        // Create a new instance of BlogModel
       console.log('tags from the userRepository --> ',tags)
       const similarBlogs = await blogModels.aggregate([
        {
            $match: {
                tags: { $in: tags } // Find blogs where tags array contains at least one tag from the given array
            }
        },
        {
            $project: {
                _id: 1,
                blog_id: 1,
                title: 1,
                banner: 1,
            }
        },
        {
            $limit: 6
        }
    ]);

    console.log('similar blogs --> ',similarBlogs)
    return similarBlogs
       
    } catch (error) {
        console.error(error);
        throw error
    }
}