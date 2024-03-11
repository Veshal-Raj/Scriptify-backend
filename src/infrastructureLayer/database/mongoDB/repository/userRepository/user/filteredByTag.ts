import UserModel from "../../../models/userModel";
import BlogModel from "../../../models/blogModel";



export const filteredByTag = async(
    tag:string, blogModels: typeof BlogModel, userModels: typeof UserModel, 
) => {
    try {
        console.log('reached inside the repository/userRepository/user/latestBlogs');
        console.log('tag --> ', tag)
        // Create a new instance of BlogModel
        let findTag = { tags: tag, draft: false }
        const maxLimit = 5;
        const blogs = await blogModels.find(findTag)
            .populate("author", "personal_info.profile_img personal_info.username -_id")
            .sort({ "publishedAt": -1 })
            .select("blog_id title des banner activity tags publishedAt -_id")
            .limit(maxLimit);
        console.log(blogs)
        return blogs;
    } catch (error) {
        console.error(error);
        throw error
    }
}