import UserModel from "../../../models/userModel";
import BlogModel from "../../../models/blogModel";


export const increaseBlogReadCount = async(
    userId: string,
    blogId: string,
    blogModels: typeof BlogModel,
    userModels: typeof UserModel 
) => {
    try {
       // Check if the user has already read the blog
       const user = await userModels.findById(userId);
       
       if (!user) {
           throw new Error("User not found");
       }
       const blog = await blogModels.findOne({  blog_id: blogId });

       if (blog) {

           const isBlogAlreadyRead = user.userInteractions.userReadBlogs.some(interaction => interaction.blogId.toString() === blog._id.toString());
           
            if (isBlogAlreadyRead) {
                console.log("Blog already read by the user.");
                return 'Blog already read by the user';
            }

            blog.activity.total_reads += 1;
    
            await blog.save();
    
            const blog_id = blog._id

            user.userInteractions.userReadBlogs.push({ blogId: blog_id, interactionAt: new Date() });

            await user.save();

            return "Blog read count increased successfully."
       } else {
            return "Blog  not present"
       }
        
        
    } catch (error) {
        console.error(error);
        throw error
    }
}