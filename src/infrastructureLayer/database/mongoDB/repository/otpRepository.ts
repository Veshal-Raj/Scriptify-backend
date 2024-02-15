import OtpModel from "../models/otpModel";
import { IOtp } from "../../../../entitiesLayer/otp";
import { IOtpRepository } from "../../../../usecasesLayer/interface/repository/IotpRepository";



export class OtpRepository implements IOtpRepository {
    async findUser(email: string) {
        try {
            let isUserExist = await OtpModel.findOne({email})

            if (!isUserExist) return null
            return isUserExist
        } catch (error) {
            console.error(error);
            
            throw new Error('Internal error');
        }
    }

    
    async createOtpUserCollection(newUser: IOtp): Promise<IOtp> {
        try {
            console.log('<----------------------- reached inside the create otp user collection ----------------------------------->')
            const result = await OtpModel.create(newUser);
            console.log('result --> ', result)

            console.log('<--------------------------------------------------------------------------------------->')
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Handle specific error types
                throw error;
            } else {
                // Handle unknown error types
                throw new Error('An unknown error occurred');
            }
        }
    }

    async findUserWithOTP(email: string, otpFromUser: string): Promise<IOtp | null> {
        try {
            const otp = otpFromUser
            return await OtpModel.findOne({ email, otp })  
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Handle specific error types
                throw error;
            } else {
                // Handle unknown error types
                throw new Error('An unknown error occurred');
            }
        }
    }

    async findUserAndDelete(email: string): Promise<IOtp | null | boolean> {
        try {
            let result = await OtpModel.findOneAndDelete({email})
            console.log(result)
            return result
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Handle specific error types
                throw error;
            } else {
                // Handle unknown error types
                throw new Error('An unknown error occurred');
            }
        }
    }
}