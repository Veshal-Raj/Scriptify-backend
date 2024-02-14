import { createUser, registerUser } from "./user/index";

import IUser from "../../entitiesLayer/user";
import { IUserUseCase } from "../interface/usecase/userUseCase";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { NextFunction } from "express";
import { ErrorHandler } from "../middlewares/errorHandler";


export class UserUseCase implements IUserUseCase {
    private readonly userRepository: IUserRepository;
    

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository
    }

   // register user
   async registerUser({ name, email, password, }: { name: string; email: string; password: string; }, next: NextFunction): Promise<string | void | never> {
       try {
        // let result = registerUser()
       } catch (error: unknown | never) {
            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    async createUser(verificationCode: string, token: string, next: NextFunction): Promise<void | IUser | never> {
        try {
            
        } catch (error: unknown | never) {
            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }
}