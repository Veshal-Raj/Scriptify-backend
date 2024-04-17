import OtpModel from "../../../models/otpModel";




export const forgotPasswordOtp = async (
    otp: string, 
    email: string
) => {
    try {
        const otpDocument = await OtpModel.findOne({ email, otp });

        if (otpDocument) {
            // Email and OTP match
            return { status: true, message: 'Email and OTP match' };
        } else {
            // Email and OTP do not match
            return { status: false, message: 'Email and OTP do not match' };
        }
    } catch (error) {
        throw error
    }
}