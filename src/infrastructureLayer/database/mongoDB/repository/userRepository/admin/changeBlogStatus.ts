import BlogModel from "../../../models/blogModel";



export const changeBlogStatus = async (
    blogId: string
) => {
    try {
        console.log('blog id --- ', blogId)
        // const blog_id = blogId?.blogId
        // Find the blog by ID
        const blog = await BlogModel.findById(blogId);
        console.log('blog --- ', blog)

        // If the blog is found
        if (blog) {
            // Reverse the value of isBlocked
            const updatedStatus = !blog.isBlocked;

            // Update the blog's isBlocked status
            const a = await BlogModel.findByIdAndUpdate(blogId, { isBlocked: updatedStatus });

            console.log('a -- ', a)
            // Return the updated blog
            return updatedStatus;
        } else {
            throw new Error('Blog not found');
        }
    } catch (error) {
        throw error;
    }
}