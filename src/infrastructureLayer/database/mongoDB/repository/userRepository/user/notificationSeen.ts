import NotificationModel from "../../../models/notificationModel";



export const notificationSeen = async ( notificationId: string ) => {
    try {
        const updatedNotification = await NotificationModel.findByIdAndUpdate(
            notificationId,
            { seen: true },
            { new: true } // Return the updated document
        );

        // Check if the notification was found and updated
        if (!updatedNotification) {
            throw new Error('Notification not found');
        }

        // Return the updated notification
        return updatedNotification;
    } catch (error) {
        throw error
    }
}