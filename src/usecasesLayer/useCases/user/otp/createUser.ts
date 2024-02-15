import { IOtp } from "../../../../entitiesLayer/otp";
import { IOtpRepository } from "../../../interface/repository/IotpRepository";


export const createOtpUserCollection = async (otpRepository: IOtpRepository, IOtpUser: IOtp) => {
    console.log('reached inside the createotp user collection ---->  ')
    const result = await otpRepository.createOtpUserCollection(IOtpUser)
    console.log(result)
}