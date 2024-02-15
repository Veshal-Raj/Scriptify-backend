import { IOtp } from "../../../entitiesLayer/otp";

export interface IOtpRepository {
    findUser(email: string): Promise<IOtp | null>;
    createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
    findUserWithOTP(email: string, otpFromUser: string): Promise<IOtp | null>
    findUserAndDelete(email: string): Promise<IOtp | null | boolean>
}