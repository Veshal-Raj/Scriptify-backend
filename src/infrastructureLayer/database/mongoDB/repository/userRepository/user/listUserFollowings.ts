
import UserModel from "../../../models/userModel";

export const listUserFollowings = async (
    userId: string,
    userModel: typeof UserModel,
    
): Promise<any | void> => {
    try {
        const user = await userModel.findById(userId).populate('following', 'personal_info.profile_img personal_info.username _id');
        console.log('user ,,,,,,',user)
        if (!user) {
            console.log('User not found.');
            return { success: false, message: 'User not found.' };
        }
        
        console.log(user.followers);
        console.log(user.following)

        // Return the followers with populated fields
        return user.following;
        
    } catch (error) {
        throw error
    }
}