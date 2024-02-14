import { IOtp } from "../../../../entitiesLayer/otp";
import { IOtpRepository } from "../../../interface/repository/IotpRepository";


export const createOtpUserCollection = async (otpRepository: IOtpRepository, IOtpUser: IOtp) => {
    const result = await otpRepository.createOtpUserCollection(IOtpUser)
}