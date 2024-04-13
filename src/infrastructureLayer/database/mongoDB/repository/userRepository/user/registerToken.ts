import UserModel from "../../../models/userModel"




export const registerToken = async(
    token: string,
    userId: string
) => {
    try {
        console.log('token --- ', token )
        console.log('userid --- ', userId)
        const user = await UserModel.findById(userId)
        console.log('user --- ', user)
    
        if (!user) throw new Error('User not found')
    
        user.NotificationToken = token;
    
        await user.save();
    
        console.log('Token registered successfully');
        
    } catch (error) {
        console.error('Error registering token:', error);
    }
}