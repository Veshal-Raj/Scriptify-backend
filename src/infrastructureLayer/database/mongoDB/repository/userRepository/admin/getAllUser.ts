import IUser from "../../../../../../entitiesLayer/user";
import UserModel from "../../../models/userModel";


export const getAllUser = async (role: string): Promise<IUser[]> => {
    try {
        return await UserModel.find({role: {$eq: role}})
    } catch (error) {
        throw error
    }
}