import { CommentData } from "../../../../../../@types/general/Comments";
import { sendNotification } from "../../../../../services/notification";
import BlogModel from "../../../models/blogModel";
import CommentModel from "../../../models/commentModel";
import NotificationModel from "../../../models/notificationModel";
import UserModel from "../../../models/userModel";

export const addBlogComment = async (
  commentData: CommentData,
  comment: string,
  userModel: typeof UserModel,
  blogModel: typeof BlogModel
): Promise<any | void> => {
  try {
    const { userId, authorId, blogId, _id } = commentData;
    const parentComment = comment;

    const newComment = new CommentModel({
      blog_id: _id, // Assuming _id is the ID of the blog
      blog_author: authorId,
      comment: parentComment,
      commented_by: userId,
    });

    const commentId = newComment._id;
    const savedComment = await newComment.save();

     await blogModel.findByIdAndUpdate(
      _id,
      {
        $inc: {
          "activity.total_comments": 1,
          "activity.total_parent_comments": 1,
        },
        $push: {
          comments: commentId,
        },
      },
      { new: true }
    );

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          "userInteractions.userCommentBlogs": {
            blogId: _id,
            interactionAt: Date.now(),
          },
        },
      },
      { new: true }
    );

    await NotificationModel.create({
      type: "comment",
      blog: _id,
      notification_for: authorId,
      user: userId,
      comment: commentId,
      seen: false,
    });

    const user = await userModel.findById(userId);
    const authorData = await UserModel.findById(authorId);

    const title = " ❤️ Your blog has been Commented. ❤️";

    const body = ` ${user?.personal_info.username} commented on your blog`;

    if (authorData?.NotificationToken) {
      await sendNotification(authorData.NotificationToken, body, title);
    }

    return {
      commentID: commentId,
      commentedUser: {
        id: updatedUser?._id,
        username: updatedUser?.personal_info.username,
      },
      comment: savedComment.comment,
      commentTime: savedComment.commentedAt,
    };
  } catch (error) {
    throw error;
  }
};
