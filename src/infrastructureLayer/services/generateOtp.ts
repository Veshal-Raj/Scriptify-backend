import { IcreateOTP } from "../../usecasesLayer/interface/services/IcreateOTP";

export class GenerateOtp implements IcreateOTP{
    async generateOTP():  Promise<string> {
        const otpLength = 4;
        const minDigit = 1000; 
        const maxDigit = 9999; 

        const randomNumber = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;

        // Convert the random number to a string and pad with zeros if necessary
        const otp = randomNumber.toString().padStart(otpLength, '0');

        return otp;
    }
}
