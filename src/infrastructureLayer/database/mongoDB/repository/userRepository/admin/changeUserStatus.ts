import IUser from "../../../../../../entitiesLayer/user";
import UserModel from "../../../models/userModel";


export const changeUserStatus = async (id: string): Promise<IUser | null> => {
    try {
        const user = await UserModel.findById(id);

        if (!user) return null

        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: id},
            {$set: {isVerified: !user.isVerified}},
            {new: true}
        )

        return updatedUser
    } catch (error) {
        throw error
    }
}