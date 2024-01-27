import { ICreateOtp } from "../../usecasesLayer/interface/services/createOtp";

export class GenerateOtp implements ICreateOtp {
  async generateOTP(): Promise<string> {
    console.log('generate otp function')
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}