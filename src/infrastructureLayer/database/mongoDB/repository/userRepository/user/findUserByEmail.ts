import UserModel from "../../../models/userModel";



export const findUserByEmail = async(
    email: string,
    userModels: typeof UserModel
) => {
   try {
        const existingUser = await userModels.findOne({email})
        return existingUser
   } catch (error) {
        throw error
   }
}