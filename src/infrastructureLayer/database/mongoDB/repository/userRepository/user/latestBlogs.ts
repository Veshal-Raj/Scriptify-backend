import UserModel from "../../../models/userModel";
import BlogModel from "../../../models/blogModel";



export const latestBlogs = async(
    blogModels: typeof BlogModel, userModels: typeof UserModel, 
) => {
    try {
        console.log('reached inside the repository/userRepository/user/latestBlogs');
        // Create a new instance of BlogModel
        const maxLimit = 5;
        const blogs = await blogModels.find({ draft: false })
            .populate("author", "personal_info.profile_img personal_info.username -_id")
            .sort({ "publishedAt": -1 })
            .select("blog_id title des banner activity tags publishedAt -_id")
            .limit(maxLimit);
        
        return blogs;
    } catch (error) {
        console.error(error);
        throw error
    }
}