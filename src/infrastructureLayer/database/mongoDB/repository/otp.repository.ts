import otpModel from '../models/otp.model'
import { IOtp } from '../../../../entitiesLayer/otp'
import { IOtpRepository } from '../../../../usecasesLayer/interface/repository/otpRepository'


export class OtpRepository implements IOtpRepository {

    async createOtpUserCollection(newuser: IOtp): Promise<IOtp> {
        try {
            console.log('reached inside createOtpUserCollection')
            console.log(newuser)
            // Set createdAt and expiresAt values
            newuser.createdAt = new Date();
            newuser.expiresAt = new Date(Date.now() + 65 * 1000); // 70 seconds later
            const result = await otpModel.create(newuser)
            console.log('result --> ', result)
            return result
        } catch (error: any) {
            console.log(error.message)
            throw error
        }
    }
}