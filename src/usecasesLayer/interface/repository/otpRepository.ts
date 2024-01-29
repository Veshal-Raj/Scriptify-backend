import { IOtp } from '../../../entitiesLayer/otp'

export interface IOtpRepository {
    createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
    // SaveOtp(otp: IOtp): Promise<{ success: boolean, message: string }>
    findUserByEmail(email: string): Promise<IOtp | null>;
}