
import BlogModel from "../../../models/blogModel";
import UserModel from "../../../models/userModel";

export const unLikeBlogByUser = async (
    blog_id: string,
    userId: string,
    userModel: typeof UserModel,
    blogModel: typeof BlogModel
): Promise<any | void> => {
    try {
        const user = await userModel.findById(userId);
        if (!user?.userInteractions.userLikedBlogs.map(blog => String(blog.blogId)).includes(blog_id)) {
            console.log('User has not liked the blog.');
            return { success: false, message: 'User has not liked the blog' };
        }

        // If the user has not already liked the blog, proceed to like it
        // const updatedBlog = await blogModel.findByIdAndUpdate(blog_id, { $inc: { 'activity.total_likes': 1 } });
        console.log('bloooooggggid',blog_id)
        // const id = updatedBlog?._id
        const updatedUser = await userModel.findByIdAndUpdate(userId, { $push: { 'userInteractions.userLikedBlogs': { blogId: blog_id.toString(), interactionAt: new Date() } } });
        await userModel.findByIdAndUpdate(userId, { $pull: { 'userInteractions.userLikedBlogs': { blogId: blog_id.toString() } } });
        // console.log(updatedBlog, updatedUser.userInteractions.userLikedBlogs);
        const updatedBlog = await blogModel.findByIdAndUpdate(blog_id, { $inc: { 'activity.total_likes': -1 } });
        return { success: true, message: 'Unlike successful' };

    } catch (error) {
        throw error
    }
}