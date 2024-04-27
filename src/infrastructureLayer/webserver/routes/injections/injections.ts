import UserModel from "../../../database/mongoDB/models/userModel";
import BlogModel from "../../../database/mongoDB/models/blogModel";
import CommentModel from "../../../database/mongoDB/models/commentModel";

import { UserRepository } from "../../../database/mongoDB/repository/userRepository";
import { OtpRepository } from "../../../database/mongoDB/repository/otpRepository";
import { AdminRepository } from "../../../database/mongoDB/repository/adminRepository";

import { Encrypt } from "../../../services/hashPassword";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { JWTtoken } from "../../../services/jwt";
import CustomLogger  from "../../../services/errorLogging";
import { CloudSession } from "../../../services/cloudSession";
import { CloudStorage } from "../../../services/cloudStorage";
import { PaymentService } from "../../../services/payment";

import { UserUseCase } from "../../../../usecasesLayer/useCases/userUseCase";
import { AdminUseCase } from "../../../../usecasesLayer/useCases/adminUseCase";

import { UserController } from "../../../../AdaptersLayer/userController";
import { AdminController } from "../../../../AdaptersLayer/adminController";

const userRepository = new UserRepository(UserModel, BlogModel)
const adminRepository = new AdminRepository()
const bcryptService = new Encrypt()
const generateOTP = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const jwtToken = new JWTtoken()
const logger = new CustomLogger()
const cloudSession = new CloudSession()
const cloudStorage = new CloudStorage()
const paymentService = new PaymentService()


const userUseCase = new UserUseCase(
    userRepository,
    bcryptService,
    generateOTP,
    sendMail,
    otpRepository,
    jwtToken,
    cloudSession,
    cloudStorage,
    logger,
    paymentService
)

const adminUseCase = new AdminUseCase(
    adminRepository,
    logger
)

const userController = new UserController(userUseCase)
const adminController = new AdminController(adminUseCase)

export { userController, adminController }