import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/services/response";
import {IHashpassword} from '../../interface/services/hashPassword'
import {IUserRepository} from '../../interface/repository/userRepository'
import {IRequestValidator} from '../../interface/repository/validateRepository'
import { IOtpRepository } from "../../interface/repository/otpRepository";
// import { UserRepository } from "../../../infrastructureLayer/database/mongoDB/repository/userRepository";


export const registerUser = async (
    otpRepository: IOtpRepository,
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    name: string,
    email: string,
    password: string
): Promise<Response> => {
    console.log('inside userUsecase / user/ createUser')
    try {
       const {userExist} = await userRepository.findUserByEmail(email)
       if (userExist) {
        return {status: 400, success: false, message: "user with this mail id already exists",}
       } else {
        password = await bcrypt.createHash(password)
        const createNewUser = await userRepository.createUser({name, email, password})
        console.log('created new user --> ', createNewUser)
        return createNewUser
       }
    } catch (error) {
        throw error
    }
}