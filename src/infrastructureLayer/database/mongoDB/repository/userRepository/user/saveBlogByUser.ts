
import BlogModel from "../../../models/blogModel";
import NotificationModel from "../../../models/notificationModel";
import UserModel from "../../../models/userModel";

export const saveBlogByUser = async (
    blog_id: string,
    userId: string,
    userModel: typeof UserModel,
    blogModel: typeof BlogModel
): Promise<any | void> => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            console.log('User not found.');
            return { success: false, message: 'User not found.' };
        }
        console.log(user)
        // Check if the blog is already saved by the user
        if (user.userInteractions.userSavedBlogs.map(blog => String(blog.blogId)).includes(blog_id)) {
            console.log('User has already saved the blog.');
            return { success: false, message: 'User has already saved the blog.' };
        }

        // Save the blog for the user
        await userModel.findByIdAndUpdate(userId, {
            $push: { 'userInteractions.userSavedBlogs': { blogId: blog_id.toString(), interactionAt: new Date() } }
        });

        const savedBlog = await blogModel.findById(blog_id);

        await NotificationModel.create({
            type: "save",
            blog: blog_id,
            notification_for: savedBlog?.author,
            user: userId,
            seen: false
        })

        return { success: true, message: 'Blog saved successfully.' };
    } catch (error) {
        throw error
    }
}