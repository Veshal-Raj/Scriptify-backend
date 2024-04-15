import NotificationModel from "../../../models/notificationModel";



export const notificationCount = async ( userId: string) => {
    try {
        const count = await NotificationModel.countDocuments({ notification_for: userId, seen: false });
        console.log('notification count ---- ', count)
        return count
    } catch (error) {
        throw error
    }
}