
import { Comment, CommentData } from "../../../../../../@types/general/Comments";
import BlogModel from "../../../models/blogModel";
import CommentModel from "../../../models/commentModel";
import UserModel from "../../../models/userModel";

export const addBlogComment = async (
    commentData: CommentData,
    comment: Comment,
    userModel: typeof UserModel,
    blogModel: typeof BlogModel,
    commentModel: typeof CommentModel
): Promise<any | void> => {
    try {
        console.log(' commentData --->>> ', commentData)
        console.log('comment --->>> ', comment)
        
        const { userId, authorId, blogId, _id} = commentData
        const parentComment = comment

        console.log('parentComment --- >> ', parentComment)
        console.log('userId --- >> ', userId)
        console.log('authorId --- >> ', authorId)
        console.log('blog(d --- >> ', blogId)
        console.log('_id --- >>', _id)

        const newComment = new CommentModel({
            blog_id: _id, // Assuming _id is the ID of the blog
            blog_author: authorId,
            comment: parentComment,
            commented_by: userId
        });

        const commentId = newComment._id
        const savedComment = await newComment.save();

        console.log('New Comment:', savedComment);

        const updatedBlog = await  blogModel.findByIdAndUpdate(
            _id,
            {
                $inc: {
                    "activity.total_comments": 1,
                    "activity.total_parent_comments": 1
                },
                $push: {
                    comments: commentId
                }
            },
            {new: true}
        )

        console.log('updatedBlog --->>> ', updatedBlog)

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    "userInteractions.userCommentBlogs": {
                        blogId: _id,
                        interactionAt: Date.now()
                    }
                }
            },
            { new: true }
        )

        console.log('updatedUser -->> ', updatedUser)

        return {
            commentID: commentId,
            commentedUser: {
                id: updatedUser?._id,
                username: updatedUser?.personal_info.username
            },
            comment: savedComment.comment,
            commentTime: savedComment.commentedAt
        };

    } catch (error) {
        throw error
    }
}