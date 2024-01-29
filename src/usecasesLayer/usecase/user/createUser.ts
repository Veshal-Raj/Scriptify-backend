import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/services/response";
import {IHashpassword} from '../../interface/services/hashPassword'
import {IUserRepository} from '../../interface/repository/userRepository'
import {IRequestValidator} from '../../interface/repository/validateRepository'
import { ISendMail } from "../../interface/services/sendMail";
import { ICreateOtp } from "../../interface/services/createOtp";
import { IOtpRepository } from "../../interface/repository/otpRepository";
// import { UserRepository } from "../../../infrastructureLayer/database/mongoDB/repository/userRepository";


export const createUser = async (
    userRepository: IUserRepository,
    sendMail: ISendMail,
    createOtp: ICreateOtp,
    otpRepository:IOtpRepository,
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
       } 
   
       // checking whether user is already present in the otp repo
       let userExistOtp = await otpRepository.findUserByEmail(email)
       console.log('user exist ', userExistOtp)
       if (userExistOtp){

           return {
               status: 200,
               success: true,
               message: "verification otp has been sent the mail",
               
            };
        } else {
            return { status: 500,
                success: false,message: 'something is wrong on usecaseslayer/usecase/user/createuser '}
        }
    } catch (error) {
        throw error
    }
}