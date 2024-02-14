import { IOtp } from "../../../entitiesLayer/otp";

export interface IOtpRepository {
    createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
    findUserWithOTP(email: string, otpFromUser: string): Promise<IOtp | null>
}