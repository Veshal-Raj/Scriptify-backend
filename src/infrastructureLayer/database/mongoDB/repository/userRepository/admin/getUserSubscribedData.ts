import UserModel from "../../../models/userModel";






export const getUserSubscribedData = async () => {
    try {
        const subscribedCount = await UserModel.countDocuments({ isSubscribed: true });

        // Count total documents
        const totalCount = await UserModel.countDocuments();

        // Calculate unsubscribed count
        const unsubscribedCount = totalCount - subscribedCount;

        return [subscribedCount, unsubscribedCount, totalCount];
    } catch (error) {
        throw error
    }
}