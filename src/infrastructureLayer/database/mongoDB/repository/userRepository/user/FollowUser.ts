
import NotificationModel from "../../../models/notificationModel";
import UserModel from "../../../models/userModel";
import { sendNotification } from "../../../../../services/notification";

export const FollowUser = async (
    authorId: string,
    userId: string,
    userModels: typeof UserModel,
): Promise<any | void> => {
    try {
        console.log(userId)
        console.log('autorid', authorId)
        const user = await userModels.findById( userId)
        const author = await userModels.findById(authorId)
        console.log(author)
        if (!user) {
            throw new Error("User not found");
        }

        if (!author) {
            throw new Error("Author not found");
        }

        if (!user.following.includes(authorId)) {
            // If not, add it to the following list
            user.following.push(authorId);
            // Save the updated user document
            await user.save();

            await NotificationModel.create({
                type: 'follow',
                notification_for: authorId,
                user: userId,
                seen: false
            })

            const authorData = await UserModel.findById(authorId);
            if (!authorData) {
                throw new Error("Author data not found")
            }
            const title = "You have a new follower 👱🏻‍♂️"
            const body = `New follower: ${user.personal_info.username}`
            if (authorData.NotificationToken) {

                await sendNotification(authorData.NotificationToken,body , title)
            }
        } else {
            console.log("User is already following the author.");
            return  { success: false, message: 'Already following'}
        }

        if (!author.followers.includes(userId)) {
            author.followers.push(userId)
            await author.save()
        } else {
            console.log('User is already a follower of the author.')
            return  { success: false, message: 'Already follower'}
        }

        
        
        console.log('result -->> ',user)
        console.log('<<,,, author --- ',author)
        return { success: true, message: 'success' };
    } catch (error) {
        throw error
    }
}