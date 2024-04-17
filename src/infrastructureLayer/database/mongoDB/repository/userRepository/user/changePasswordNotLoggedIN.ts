import UserModel from "../../../models/userModel"



export const changePasswordNotLoggedIN = async(
    email: string,
    newPassword: string
) => {
    try {
        console.log('email -- ', email, 'new password --- ', newPassword)
        const user = await UserModel.findOne({ "personal_info.email": email });
        if (!user) {
            throw new Error('User not found')
        }
        console.log('user data --- ', user)
        console.log('newpassword -- ', newPassword)
        user.personal_info.password = newPassword
        await user.save()

        return user
    } catch (error) {
        throw error
    }
} 