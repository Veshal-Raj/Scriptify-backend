import { IOtpRepository } from "../interface/repository/otpRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import { ICreateOtp } from "../interface/services/createOtp";
import { IHashpassword } from "../interface/services/hashPassword";
import { ISendMail } from "../interface/services/sendMail";

import { createUser } from "./user/index";

console.log('reached inside userusecase')
export class UserUsecase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly otpGenerator: ICreateOtp;
  private readonly sendMail: ISendMail;
  private readonly  otpRepository: IOtpRepository;
  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: ICreateOtp,
    sendMail: ISendMail,
    otpRepository: IOtpRepository
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
  }

  async createUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    console.log('reached inside the createUser function --> src/usecasesLayer/usecase/userUseCase')
    let NewUser = await createUser(
      this.userRepository,
      this.bcrypt,
      name,
      email,
      password
    );
    console.log(NewUser)
    if (NewUser.user) {
        const Otp = await this.otpGenerator.generateOTP()
        console.log('otp --> ', Otp)
        await this.otpRepository.createOtpUserCollection({
            userMail: NewUser.user.email,
            otp: Otp,
        })
        await this.sendMail.sendEmailVerification(
            NewUser.user.name,
            NewUser.user.email,
            Otp
        )
        return NewUser
    }
    return NewUser
  }
}
