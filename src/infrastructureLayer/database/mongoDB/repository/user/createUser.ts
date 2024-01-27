import {IUser} from '../../../../../entitiesLayer/user'
import userModel from '../../models/userModel'

export const createUser = async (
    newUser: IUser,
    userModels: typeof userModel
):Promise<{user?: IUser; success: boolean; message: string; status: number}> => {
    try {
        console.log('inside createUser of repository == ', newUser)
        const user = await userModels.create(newUser)
        await user.save()
        console.log('inside createUser of repository ===> ', user)
        return {user, success: true, message: "user created successfully", status: 200}
    } catch (error) {
        console.log('inside error in createUser in framework', error)
        throw error
    }
}