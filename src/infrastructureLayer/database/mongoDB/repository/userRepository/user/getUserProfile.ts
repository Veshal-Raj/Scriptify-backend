import { Next } from "../../../../../types/serverPackageTypes";
import UserModel from "../../../models/userModel";

export const getUserProfile = async (
    userId: string,
    userModels: typeof UserModel,
    next: Next
): Promise<any | void> => {
    try {
        console.log(userId)
        const result = await userModels.findById( userId)
         .select("-personal_info.password -google_auth -updatedAt -blogs ")

         console.log('result -->> ',result)
        return result;
    } catch (error) {
        throw error
    }
}