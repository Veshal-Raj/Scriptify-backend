import nodemailer from 'nodemailer'
require("dotenv").config()

import { ISendMail } from '../../usecasesLayer/interface/services/IsendMail'

export class SendMail implements ISendMail {
    private transporter: nodemailer.Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"), // if we dont do this the host will show warning
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    sendEmailVerification(username: string, email: string, verificationCode: string): Promise<{ success: boolean }> {
        console.log('username --- ',username)
        return new Promise((resolve, reject) => {
            const mailOptions: nodemailer.SendMailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject: 'Scriptify Email Verification',
                text: `Hi ${username},\n\nYour Verification Code is ${verificationCode}. Do not share this code with anyone.`
            };

            this.transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.error(err.message);
                    reject({ success: false, error: err });
                } else {
                    resolve({ success: true });
                }
            });
        });
    }
    }
    