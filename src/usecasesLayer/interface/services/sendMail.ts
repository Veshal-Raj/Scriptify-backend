export interface ISendMail {
    sendEmailVerification(fullname: string, email: string, verificationCode: string): Promise<{success: boolean}>
}