
import UserModel from "../../../models/userModel";



export const fetchUserBlog = async(
    userId:string,
    userModel: typeof UserModel,
) => {
    try {
        console.log('reached inside the repository/userRepository/user/searchbyquery');
        console.log('userId --> ', userId)
        
        const user = await userModel.findById(userId).populate('blogs')
        .sort({ "publishedAt": -1 })
            .select("blog_id title des banner activity tags publishedAt -_id");

        // Access the user's populated blogs
        // const blogs = user?.blogs;

        console.log('blogs -->>', user);
        return user;
    } catch (error) {
        console.error(error);
        throw error
    }
}