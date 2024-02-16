import IUser from "../../entitiesLayer/user";
import { IUserUseCase } from "../interface/usecase/userUseCase";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { Next, Ilogger } from "../../infrastructureLayer/types/serverPackageTypes";
import { ErrorHandler } from "../middlewares/errorHandler";

import { createUser, registerUser } from "./user/index";
// import { ILogger } from "../interface/services/IerrorLog";
import { IHashpassword } from "../interface/services/IhashPassword";
import { IcreateOTP } from "../interface/services/IcreateOTP";
import { ISendMail } from "../interface/services/sendMail";
import { IJwt } from "../interface/services/Ijwt.types";
import { IOtpRepository } from "../interface/repository/IotpRepository";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";


export class UserUseCase implements IUserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly otpGenerator: IcreateOTP;
    private readonly sendMail: ISendMail;
    private readonly otpRepository: IOtpRepository;
    private readonly jwtToken: IJwt;
    private readonly logger: CustomLogger;

    constructor(
        userRepository: IUserRepository,
        bcrypt: IHashpassword,
        otpGenerator: IcreateOTP,
        sendMail: ISendMail,
        otpRepository: IOtpRepository,
        jwtToken: IJwt,
        logger: CustomLogger
        ){
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.otpGenerator = otpGenerator;
        this.sendMail = sendMail;
        this.otpRepository = otpRepository;
        this.jwtToken = jwtToken;
        this.logger = logger
    }

   // register user
   async registerUser({ fullname, email, password, }: { fullname: string; email: string; password: string; }, next: Next): Promise<string | void | never> {
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
            next,
            this.logger
        )
        
        return result
       } catch (error: unknown | never) {
        // this.logger.error(error instanceof Error ? error.message : 'Unknown error'); // Log error
        

            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', this.logger));
        }
    }

    async createUser(otpFromUser: string, token: string, next: Next): Promise<void | IUser | null> {
        try {
            console.log('otp from user ---->>>> ',otpFromUser,'token ------->>>>> ', token)
            return await createUser(
                this.userRepository,
                this.otpRepository,
                this.jwtToken,
                otpFromUser,
                token,
                next,
                this.logger
            )
        } catch (error: unknown | never) {
            // this.logger.error(error instanceof Error ? error.message : 'Unknown error'); // Log error

            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', this.logger));
        }
    }
}