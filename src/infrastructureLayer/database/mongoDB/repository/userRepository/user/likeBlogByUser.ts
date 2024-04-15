
import { sendNotification } from "../../../../../services/notification";
import BlogModel from "../../../models/blogModel";
import NotificationModel from "../../../models/notificationModel";
import UserModel from "../../../models/userModel";

export const likeBlogByUser = async (
    blog_id: string,
    userId: string,
    userModel: typeof UserModel,
    blogModel: typeof BlogModel
): Promise<any | void> => {
    try {
        const user = await userModel.findById(userId);
        if (user?.userInteractions.userLikedBlogs.map(blog => String(blog.blogId)).includes(blog_id)) {
            console.log('User has already liked the blog.');
            return { success: false, message: 'User has already liked the blog' };
        }

        // If the user has not already liked the blog, proceed to like it
        const updatedBlog = await blogModel.findByIdAndUpdate(blog_id, { $inc: { 'activity.total_likes': 1 } });
        console.log('bloooooggggid',blog_id)
        const id = updatedBlog?._id
        const updatedUser = await userModel.findByIdAndUpdate(userId, { $push: { 'userInteractions.userLikedBlogs': { blogId: blog_id.toString(), interactionAt: new Date() } } });

        console.log('updatedBlog .. ', updatedBlog);

        await NotificationModel.create({
            type: 'like',
            blog: updatedBlog?._id,
            notification_for: updatedBlog?.author,
            user: userId,
            seen: false
        })
        
        const authorId = updatedBlog?.author
        const authorData = await UserModel.findById(authorId)

        const title = " ❤️ Your blog has been liked. ❤️"
        
        const body = ` ${user?.personal_info.username} liked your blog`

        if (authorData?.NotificationToken) {
            await sendNotification(authorData.NotificationToken, body, title)
        } 

        return { success: true, message: 'Like added'}

    } catch (error) {
        throw error
    }
}