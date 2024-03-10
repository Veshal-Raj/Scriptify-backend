import IUser from "../../entitiesLayer/user";
import { IUserUseCase } from "../interface/usecase/userUseCase";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { Next } from "../../infrastructureLayer/types/serverPackageTypes";
import { ErrorHandler } from "../middlewares/errorHandler";

import { createUser, registerUser, login, userCreateBlog } from "./user/index";
import { IHashpassword } from "../interface/services/IhashPassword";
import { IcreateOTP } from "../interface/services/IcreateOTP";
import { ISendMail } from "../interface/services/IsendMail";
import { IJwt, IToken } from "../interface/services/Ijwt.types";
import { IOtpRepository } from "../interface/repository/IotpRepository";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";
import { IcloudSession } from "../interface/services/IcloudSession";
import { IcloudStorage } from "../interface/services/IcloudStorage";
import { NextFunction } from "express";
import { latestBlogs } from "./user/latestBlogs";
import { trendingBlogs } from "./user/trendingBlogs";

export class UserUseCase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly otpGenerator: IcreateOTP;
  private readonly sendMail: ISendMail;
  private readonly otpRepository: IOtpRepository;
  private readonly jwtToken: IJwt;
  private readonly cloudSession: IcloudSession;
  private readonly cloudStorage: IcloudStorage;
  private readonly logger: CustomLogger;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: IcreateOTP,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    cloudSession: IcloudSession,
    cloudStorage: IcloudStorage,
    logger: CustomLogger
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
    this.jwtToken = jwtToken;
    this.cloudSession = cloudSession;
    this.cloudStorage = cloudStorage;
    this.logger = logger;
  }

  // register user
  async registerUser(
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    next: Next
  ): Promise<string | void | never> {
    try {
      let result = await registerUser(
        this.otpRepository,
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.jwtToken,
        this.bcrypt,
        email,
        username,
        password,
        next,
        this.logger
      );

      return result;
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async createUser(
    otpFromUser: string,
    token: string,
    next: Next
  ): Promise<void | IUser | { message: string }> {
    try {
      console.log(
        "otp from user ---->>>> ",
        otpFromUser,
        "token ------->>>>> ",
        token
      );
      return await createUser(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        otpFromUser,
        token,
        next,
        this.logger
      );
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<void | { user: IUser; tokens: IToken }> {
    console.log('reached inside the login ')
    try {
       return await login(
        this.userRepository,
        this.bcrypt,
        this.jwtToken,
        this.cloudSession,
        email,
        password,
        next,
        this.logger
      );
      
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async generateUploadURL(next: Next): Promise<any | void> {
    try {
      console.log('reached inside the usecaselayer')
      const uploadURL = await this.cloudStorage.generateUploadURL(next);
        console.log(uploadURL)
      return uploadURL
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async createBlog(title: string, des: string, banner: string, content: any, tags: string[], author: string, blog_id: string, draft: boolean, next: Next): Promise<any> {
    try {
      console.log('reached inside the usecaseLayer')
      const result =  await userCreateBlog( this.userRepository, title, des, banner, content, tags, author, blog_id, draft, this.logger )
      console.log('result in userusecase -->> ', result)
      return result
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async latestBlog(next: NextFunction): Promise<any> {
    try {
        console.log('reached inside the usecaselayer')
        const response = await latestBlogs(this.userRepository, next, this.logger)
        // console.log(response) 
        return response
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async trendingBlog(next: NextFunction): Promise<any> {
    try {
      console.log('reached inside the usecaselayer')
      const response = await trendingBlogs(this.userRepository, next, this.logger)
      return response 
    } catch (error: unknown | never) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }
}
