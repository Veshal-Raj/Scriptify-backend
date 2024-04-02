
import { Comment, CommentData } from "../../../../../../@types/general/Comments";
import BlogModel from "../../../models/blogModel";
import CommentModel from "../../../models/commentModel";
import UserModel from "../../../models/userModel";

export const replyComment = async (
    comment: string,
    parentCommentId: string,
    commentData: CommentData,
    userModel: typeof UserModel,
    blogModel: typeof BlogModel,
    
): Promise<any | void> => {
    try {
        console.log('comment >>>', comment)
        console.log('parent Id >>>', parentCommentId)
        const isParentComment = await CommentModel.findById(parentCommentId);

        if (!isParentComment) {
            throw new Error('Parent comment not found');
        }

        console.log('parent comment ', isParentComment)
        
        const { userId, authorId, blogId, _id} = commentData

        const newComment = new CommentModel({
            blog_id: _id, // Assuming _id is the ID of the blog
            blog_author: authorId,
            comment: comment,
            commented_by: userId,
            isReply: true
        });

        const commentId = newComment._id
        const replyComment = await newComment.save();
        console.log('saved comment >> ', replyComment )

        const replyCommentId = replyComment._id
        await CommentModel.updateOne(
            { _id: parentCommentId }, // Find the parent comment by its ID
            { $push: { children: replyCommentId } } // Push the ID of the saved reply comment to the children array

            );
            
            console.log(isParentComment)
        

      

    } catch (error) {
        throw error
    }
}