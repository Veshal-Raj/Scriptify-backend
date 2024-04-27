import NotificationModel from "../../../models/notificationModel";

export const notificationCount = async (userId: string) => {
  try {
    return await NotificationModel.countDocuments({
      notification_for: userId,
      seen: false,
    });
  } catch (error) {
    throw error;
  }
};
