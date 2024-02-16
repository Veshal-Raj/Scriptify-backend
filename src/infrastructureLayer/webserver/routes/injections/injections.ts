import UserModel from "../../../database/mongoDB/models/userModel";
import { UserRepository } from "../../../database/mongoDB/repository/userRepository";
import { OtpRepository } from "../../../database/mongoDB/repository/otpRepository";
import { UserUseCase } from "../../../../usecasesLayer/useCases/userUseCase";
import { Encrypt } from "../../../services/hashPassword";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { JWTtoken } from "../../../services/jwt";
// import { Logger } from "../../../services/errorLogging";
import { UserController } from "../../../../controllersLayer/userController";


const userRepository = new UserRepository(UserModel)
const bcryptService = new Encrypt()
const generateOTP = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const jwtToken = new JWTtoken()
// const logger = new Logger()


const userUseCase = new UserUseCase(
    userRepository,
    bcryptService,
    generateOTP,
    sendMail,
    otpRepository,
    jwtToken,
    // logger
)

const userController = new UserController(userUseCase)

export { userController}