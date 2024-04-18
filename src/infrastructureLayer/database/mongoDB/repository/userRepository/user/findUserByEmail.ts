import UserModel from "../../../models/userModel";



export const findUserByEmail = async(
    email: string,
   //  userModels: typeof UserModel
) => {
   try {
     console.log('email in findUserByEmail in userRepository --->>>> ', email)
   //   const allUsers = await UserModel.find()
   //   console.log('all users --- ', allUsers)
   console.log('admin@mail.com', 'actualstring')
   console.log(email)
        const existingUser = await UserModel.findOne({ 'personal_info.email': 'admin@mail.com' });
        console.log(existingUser)
        if (existingUser !== null && existingUser?.isVerified === false) throw new Error('User is blocked!!!') 
        else return existingUser
        
   } catch (error) {
        throw error
   }
}