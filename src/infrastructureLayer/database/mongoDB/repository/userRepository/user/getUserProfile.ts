import { Next } from "../../../../../types/serverPackageTypes";
import UserModel from "../../../models/userModel";

export const getUserProfile = async (
    userId: string,
    userModels: typeof UserModel,
    next: Next
): Promise<any | void> => {
    try {
        const result = await userModels.findOne({ "personal_info._id": userId})
         .select("-personal_info.password -google_auth -updatedAt -blogs")

         console.log(result)
        return result;
    } catch (error) {
        throw error
    }
}