import UserModel from "../../../models/userModel";


export const checkUserSubscribed = async (
    userId: string, 
) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Check if the user is subscribed
        const isSubscribed = user.isSubscribed;

        return isSubscribed;
    } catch (error) {
        throw error
    }
}