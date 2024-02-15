import { IOtp } from "../../../entitiesLayer/otp";
import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/IotpRepository";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IcreateOTP } from "../../interface/services/IcreateOTP";
import { IHashpassword } from "../../interface/services/IhashPassword";
import { IJwt } from "../../interface/services/Ijwt.types";
import { ISendMail } from "../../interface/services/sendMail";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const registerUser = async (
    otpRepository: IOtpRepository,
    userRepository: IUserRepository,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    jwtTokenGenerator: IJwt,
    bcrypt: IHashpassword,
    email: string,
    fullname: string,
    password: string | Promise<string>,
    next: Next
): Promise<string | void | never> =>{
    try {
        // check user exist
        console.log('reached insdie the register user in usercases/user/registeruser')

        const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);
        console.log('check user exist --> ',isUserExistOnUserRepo)
        
        if (isUserExistOnUserRepo) return next(new ErrorHandler(400, "user already exist with the same mail id"))
        
        // check user present in otp repo
        console.log('< ---------------------  check user present in otp repo -----------------------> ' )

        let isUserOnOtpRepo: IOtp | null = await otpRepository.findUser(email)as IOtp | null
        
        console.log(' isUserOnOtpRepo  --> ', isUserOnOtpRepo)

        if (isUserOnOtpRepo !== null ) console.log(' otp inside isUserOnOtpRepo  ', isUserOnOtpRepo?.otp)
        
        
        if (isUserOnOtpRepo == null) {
            // generate otp
            const otp = await otpGenerator.generateOTP();
            console.log('otp --> ', otp)

            await sendMail.sendEmailVerification(fullname, email, otp )
            console.log('<------------------------ Email send for verification ------------------------------->')

            const hashPassword = await bcrypt.createHash(password as string);
            password = hashPassword;
            console.log('password --> ',password)

            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                personal_info: {
                    fullname, 
                    email: email,
                    password: password as string,
                },
            })
            console.log('<--------------------------------------- jwt token ---------------------------------------> ')
            console.log(jwtToken)
            console.log('<--------------------------------------- jwt token ---------------------------------------> ')
            if(jwtToken) await otpRepository.createOtpUserCollection({ email, otp })
            return jwtToken
        } else {
            const otp = await otpGenerator.generateOTP();
            // await otpRepository.createOtpUserCollection({ email, otp })
            await sendMail.sendEmailVerification(fullname, email, otp);

            const hashPassword = await bcrypt.createHash(password as string);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                personal_info: {
                    fullname, 
                    email: email,
                    password: password as string,
                },
            })
            
            if(jwtToken) await otpRepository.createOtpUserCollection({ email, otp })

            return jwtToken;
        }
    
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
    }
}

