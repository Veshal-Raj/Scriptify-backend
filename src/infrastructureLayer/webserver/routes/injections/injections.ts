import UserModel from "../../../database/mongoDB/models/userModel";
import BlogModel from "../../../database/mongoDB/models/blogModel";
import { UserRepository } from "../../../database/mongoDB/repository/userRepository";
import { OtpRepository } from "../../../database/mongoDB/repository/otpRepository";

import { Encrypt } from "../../../services/hashPassword";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { JWTtoken } from "../../../services/jwt";
import CustomLogger  from "../../../services/errorLogging";
import { CloudSession } from "../../../services/cloudSession";
import { CloudStorage } from "../../../services/cloudStorage";

import { UserUseCase } from "../../../../usecasesLayer/useCases/userUseCase";
import { AdminUseCase } from "../../../../usecasesLayer/useCases/adminUseCase";

import { UserController } from "../../../../controllersLayer/userController";
import { AdminController } from "../../../../controllersLayer/adminController";

const userRepository = new UserRepository(UserModel, BlogModel)
const bcryptService = new Encrypt()
const generateOTP = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const jwtToken = new JWTtoken()
const logger = new CustomLogger()
const cloudSession = new CloudSession()
const cloudStorage = new CloudStorage()


const userUseCase = new UserUseCase(
    userRepository,
    bcryptService,
    generateOTP,
    sendMail,
    otpRepository,
    jwtToken,
    cloudSession,
    cloudStorage,
    logger
)

const adminUseCase = new AdminUseCase(
    userRepository,
    logger
)

const userController = new UserController(userUseCase)
const adminController = new AdminController(adminUseCase)

export { userController, adminController }