import { IOtp } from "../../../entitiesLayer/otp";

export interface IOtpRepository {
    findUser(email: string): unknown;
    createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
    findUserWithOTP(email: string, otpFromUser: string): Promise<IOtp | null>
}