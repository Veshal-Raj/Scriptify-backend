
import userModel from "../../models/userModel";

export const findUserByEmail = async (email: string, userModels: typeof userModel) => {
    const existingUser = await userModels.findOne({email})
    if (existingUser) {
        return {existingUser: true}
    } else {
        return {existingUser: false}
    }
}