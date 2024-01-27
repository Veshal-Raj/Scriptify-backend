import otpModel from '../models/otp.model'
import { IOtp } from '../../../../entitiesLayer/otp'
import { IOtpRepository } from '../../../../usecasesLayer/interface/repository/otpRepository'


export class OtpRepository implements IOtpRepository {

    async createOtpUserCollection(newuser: IOtp): Promise<IOtp> {
        try {
            console.log('reached inside createOtpUserCollection')
            const result = await otpModel.create(newuser)
            return result
        } catch (error: any) {
            console.log(error.message)
            throw error
        }
    }
}