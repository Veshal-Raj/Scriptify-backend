import UserModel from "../../../database/mongoDB/models/userModel";
import { UserRepository } from "../../../database/mongoDB/repository/userRepository";
import { OtpRepository } from "../../../database/mongoDB/repository/otpRepository";

import { Encrypt } from "../../../services/hashPassword";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { JWTtoken } from "../../../services/jwt";
import CustomLogger  from "../../../services/errorLogging";
import { CloudSession } from "../../../services/cloudSession";

import { UserUseCase } from "../../../../usecasesLayer/useCases/userUseCase";
import { AdminUseCase } from "../../../../usecasesLayer/useCases/adminUseCase";

import { UserController } from "../../../../controllersLayer/userController";
import { AdminController } from "../../../../controllersLayer/adminController";

const userRepository = new UserRepository(UserModel)
const bcryptService = new Encrypt()
const generateOTP = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const jwtToken = new JWTtoken()
const logger = new CustomLogger()
const cloudSession = new CloudSession()


const userUseCase = new UserUseCase(
    userRepository,
    bcryptService,
    generateOTP,
    sendMail,
    otpRepository,
    jwtToken,
    cloudSession,
    logger
)

const userController = new UserController(userUseCase)

export { userController}