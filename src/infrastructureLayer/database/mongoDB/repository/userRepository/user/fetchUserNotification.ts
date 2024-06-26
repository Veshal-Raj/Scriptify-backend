import BlogModel from "../../../models/blogModel";
import NotificationModel from "../../../models/notificationModel";
import UserModel from "../../../models/userModel";

export const fetchUserNotification = async (userId: string) => {
  try {
    const userNotifications = await NotificationModel.find({
      notification_for: userId,
    })
      .populate("blog") // Populate the 'blog' field with actual blog data
      .populate("comment"); // Populate the 'comment' field with actual comment data

    const user = await UserModel.findById(userId);

    const formattedNotifications = await Promise.all(
      userNotifications.map(async (notification) => {
        const followedUser = await UserModel.findById(notification.user);

        switch (
          notification.type as
            | "comment"
            | "reply"
            | "message"
            | "like"
            | "follow"
            | "save"
        ) {
          case "follow":
            return {
              type: notification.type,
              username: followedUser?.personal_info.username || "Unknown",
              userImage:
                followedUser?.personal_info.profile_img || "Default User Image",
              time: notification.createdAt,
              userId: notification.user,
              notificationId: notification._id,
              seen: notification.seen,
            };
          case "like":
          case "save":
          case "comment":
            const blog = await BlogModel.findById(notification.blog);

            return {
              type: notification.type,
              username: followedUser?.personal_info.username || "Unknown",
              blogBannerImage: blog?.banner || "Default Blog Banner Image",
              time: notification.createdAt,
              blogId: blog?.blog_id,
              notificationId: notification._id,
              seen: notification.seen,
            };
          default:
            return null;
        }
      })
    );

    const result = formattedNotifications
      .filter((notification) => notification !== null)
      .sort((a, b) => {
        if (a && b) {
          return b.time.getTime() - a.time.getTime();
        }
        return 0;
      });

    if (result) return result;
  } catch (error) {
    throw error;
  }
};
