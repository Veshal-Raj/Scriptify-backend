import { IOtpRepository } from "../interface/repository/otpRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import { ICreateOtp } from "../interface/services/createOtp";
import { IHashpassword } from "../interface/services/hashPassword";
import { ISendMail } from "../interface/services/sendMail";
import { redis } from "../../infrastructureLayer/webserver/config/redis";


import { createUser , registerUser} from "./user/index";

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

  async registerUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;  
    password: string;
  }) {
    console.log('reached inside the createUser function --> src/usecasesLayer/usecase/userUseCase');

    // Step 0: check whether the user is exist or not
    this.userRepository.findUserByEmail(email)
  .then((isUserExist) => {
    console.log('isUserExist --> ', isUserExist);

    // Now you can continue with the rest of your logic
    if (isUserExist.userExist) {
      // User exists, do something
      console.log('User exists!');
      return {message: 'user exist!'}
    } else {
      // User does not exist, do something else
      console.log('User does not exist.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

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
      

    // Step 4: Create User
    
    const userData = {
      name,
      email,
      password,
      // Add other user data as needed
    };

    // You can return this user data to be used in the UserController
    return { success: true, message: 'Registration successful! Check your email for verification.', userData };
      
    
  }
}
