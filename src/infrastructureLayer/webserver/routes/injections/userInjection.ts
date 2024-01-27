import userModel from '../../../database/mongoDB/models/userModel'
import { UserRepository } from '../../../database/mongoDB/repository/userRepository'
import { UserUsecase } from '../../../../usecasesLayer/usecase/userUseCase'
import { UserController } from '../../../../controllersLayer/userController'
import Encrypt from '../../../services/hashedPassword'
import {GenerateOtp} from '../../../services/generateOtp'
import { SendMail } from '../../../services/sendMail'
import { OtpRepository } from '../../../database/mongoDB/repository/otp.repository'


const userRepository = new UserRepository(userModel)
const bcryptService = new Encrypt()
const generateOtp = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const userUsecase = new UserUsecase(userRepository, bcryptService, generateOtp, sendMail, otpRepository)
const userController = new UserController(userUsecase, userRepository)
console.log('reached inside src/infrastructure/webserver/routes/injections/userInjection')

export { userController }