import OtpModel from "../models/otpModel";
import { IOtp } from "../../../../entitiesLayer/otp";
import { IOtpRepository } from "../../../../usecasesLayer/interface/repository/IotpRepository";



export class OtpRepository implements IOtpRepository {
    findUser(email: string): unknown {
        throw new Error("Method not implemented.");
    }

    
    async createOtpUserCollection(newUser: IOtp): Promise<IOtp> {
        try {
            const result = await OtpModel.create(newUser);
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
}