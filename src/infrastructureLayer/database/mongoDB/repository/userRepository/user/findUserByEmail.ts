import UserModel from "../../../models/userModel";



export const findUserByEmail = async(
    email: string,
    userModels: typeof UserModel
) => {
   try {
     console.log('email in findUserByEmail in userRepository --->>>> ', email)
        const existingUser = await userModels.findOne({ 'personal_info.email': email });
        console.log(existingUser)
        if (existingUser !== null && existingUser?.isVerified === false) throw new Error('User is blocked!!!') 
        else return existingUser
        
   } catch (error) {
        throw error
   }
}