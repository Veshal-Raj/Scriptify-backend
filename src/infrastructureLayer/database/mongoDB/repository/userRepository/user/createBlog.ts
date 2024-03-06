import UserModel from "../../../models/userModel";
import BlogModel from "../../../models/blogModel";



export const CreateBlog = async(
    title: string, des: string, banner: string, content: any, tags: string[], authorId: string, blog_id: string, draft: boolean,
    userModels: typeof UserModel, blogModels: typeof BlogModel
) => {
   try {
    console.log('reached inside the repository/userRepository/user/createBlog')
    // Create a new instance of BlogModel
    const blog = new blogModels({
        title,
        des,
        banner,
        content,
        tags,
        author: authorId,
        blog_id,
        draft: Boolean(draft),
      });
      console.log('blog -->> ', blog)
      // Save the new blog to the database
      const savedBlog = await blog.save();
      console.log('saved Blog -->> ', savedBlog)
  
      // Update the corresponding user's information
      const incrementVal = draft ? 0 : 1;
      await userModels.findOneAndUpdate(
        { _id: authorId },
        {
          $inc: { "account_info.total_posts": incrementVal },
          $push: { blogs: savedBlog._id },
        }
      );
  
      // Return the ID of the saved blog
      return { id: savedBlog.blog_id };
        
   } catch (error) {
        throw error
   }
}