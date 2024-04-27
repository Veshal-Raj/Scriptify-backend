import { CommentData } from "../../../../../../@types/general/Comments";
import CommentModel from "../../../models/commentModel";

export const replyComment = async (
  comment: string,
  parentCommentId: string,
  commentData: CommentData
): Promise<any | void> => {
  try {
    const isParentComment = await CommentModel.findById(parentCommentId);

    if (!isParentComment) {
      throw new Error("Parent comment not found");
    }

    const { userId, authorId, _id } = commentData;

    const newComment = new CommentModel({
      blog_id: _id, // Assuming _id is the ID of the blog
      blog_author: authorId,
      comment: comment,
      commented_by: userId,
      isReply: true,
    });

    const replyComment = await newComment.save();

    const replyCommentId = replyComment._id;
    await CommentModel.updateOne(
      { _id: parentCommentId }, // Find the parent comment by its ID
      { $push: { children: replyCommentId } } // Push the ID of the saved reply comment to the children array
    );
  } catch (error) {
    throw error;
  }
};
