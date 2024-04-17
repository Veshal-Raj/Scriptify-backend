import fetch from 'node-fetch';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface GoogleResponse {
    success: boolean;
}

async function recaptcha(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    // TO-DO: Replace the token and reCAPTCHA action variables before running the sample.
    
    const recaptchaKey = process.env.recaptchaKey;
    const token = req.body?.token || req.body?.Token;


    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaKey}&response=${token}`;

    try {
        const response = await fetch(url, {
            method: 'post'
        });

        const google_response = await response.json() as GoogleResponse;

        console.log('recaptcha status --> ',google_response.success);

        if (google_response.success) {
            next();
        } else {
            res.status(403).json("You are not Human!");
        }
    } catch (error) {
        res.json({ error });
    }
}

export default recaptcha;