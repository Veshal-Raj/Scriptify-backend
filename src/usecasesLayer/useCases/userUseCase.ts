import IUser from "../../entitiesLayer/user";
import { IUserUseCase } from "../interface/usecase/userUseCase";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { NextFunction } from "express";
import { ErrorHandler } from "../middlewares/errorHandler";

import { createUser, registerUser } from "./user/index";
import { IHashpassword } from "../interface/services/IhashPassword";
import { IcreateOTP } from "../interface/services/IcreateOTP";
import { ISendMail } from "../interface/services/sendMail";
import { IJwt } from "../interface/services/Ijwt.types";
import { IOtpRepository } from "../interface/repository/IotpRepository";

export class UserUseCase implements IUserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly otpGenerator: IcreateOTP;
    private readonly sendMail: ISendMail;
    private readonly otpRepository: IOtpRepository;
    private readonly jwtToken: IJwt;


    constructor(
        userRepository: IUserRepository,
        bcrypt: IHashpassword,
        otpGenerator: IcreateOTP,
        sendMail: ISendMail,
        otpRepository: IOtpRepository,
        jwtToken: IJwt
        ){
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.otpGenerator = otpGenerator;
        this.sendMail = sendMail;
        this.otpRepository = otpRepository;
        this.jwtToken = jwtToken
    }

   // register user
   async registerUser({ fullname, email, password, }: { fullname: string; email: string; password: string; }, next: NextFunction): Promise<string | void | never> {
       try {
        let result = await registerUser(
            this.otpRepository,
            this.userRepository,
            this.sendMail,
            this.otpGenerator,
            this.jwtToken,
            this.bcrypt,
            email,
            fullname,
            password,
            next
        )
        
        return result
       } catch (error: unknown | never) {
            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    async createUser(otpFromUser: string, token: string, next: NextFunction): Promise<void | IUser | never> {
        try {
            return await createUser(
                this.userRepository,
                this.otpRepository,
                this.jwtToken,
                otpFromUser,
                token,
                next
            )
        } catch (error: unknown | never) {
            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }
}