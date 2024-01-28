import { IOtpRepository } from "../interface/repository/otpRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import { ICreateOtp } from "../interface/services/createOtp";
import { IHashpassword } from "../interface/services/hashPassword";
import { ISendMail } from "../interface/services/sendMail";
import { redis } from "../../infrastructureLayer/webserver/config/redis";


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
    console.log('reached inside the createUser function --> src/usecasesLayer/usecase/userUseCase');

    // Step 1: Generate OTP
    const Otp = await this.otpGenerator.generateOTP();
    console.log('OTP generated:', Otp);

    // Step 2: Store OTP in Repository
    await this.otpRepository.createOtpUserCollection({
      userMail: email,
      otp: Otp,
    });

    
    // Step 3: Send Email Verification
    await this.sendMail.sendEmailVerification(
      name,
      email,
      Otp
      );
      
   
   // Step 4: Store User Data in Redis
const user = {
  name,
  email,
  password,  // Note: It's not recommended to store plain passwords, consider hashing before storage
};

try {
  const response = await redis.hmset(email, user);
  console.log('Redis response:', response);
  console.log('Data stored in Redis successfully');
} catch (error) {
  console.error('Error storing data in Redis:', error);
  // Handle error here
}

    // Step 5: Create User
    const NewUser = await createUser(
      this.userRepository,
      this.bcrypt,
      name,
      email,
      password
    );

    return NewUser;
  }
}
