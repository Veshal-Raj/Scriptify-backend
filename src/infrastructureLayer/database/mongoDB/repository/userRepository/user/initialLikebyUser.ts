
import UserModel from "../../../models/userModel";

export const initialLikebyUser = async (
    userId: string,
    blog_id: string,
    userModel: typeof UserModel,
   
): Promise<any | void> => {
    try {
        const user = await userModel.findById(userId);
        
        if (user && user.userInteractions.userLikedBlogs.some(likedBlog => likedBlog.blogId.toString() === blog_id)) {
            return true; // Blog is liked by the user
        } else {
            return false; // Blog is not liked by the user
        }
       

    } catch (error) {
        throw error
    }
}