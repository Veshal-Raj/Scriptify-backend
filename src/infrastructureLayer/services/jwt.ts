import IUser from "../../entitiesLayer/user";
import { IJwt, IToken } from "../../usecasesLayer/interface/services/Ijwt.types";
import jwt from "jsonwebtoken";
require('dotenv').config()

export class JWTtoken implements IJwt {
    JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
    JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
    JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";
    
    async createVerificationJWT(payload: IUser): Promise<string> {      
        try {
            const verifyToken = jwt.sign(payload, this.JWT_VERIFICATION_KEY, {
                expiresIn: "15m",
            })
           
            return verifyToken
        } catch (error) {
            throw error
        }
    }

    async createAccessAndRefreshToken(_id: string): Promise<IToken> {
        try {
            console.log('inside the createAccessAndRefreshToken in jwt.ts ')
        const accessToken = jwt.sign({ id: _id }, this.JWT_ACCESS_KEY, {
            expiresIn: "5h",
        });
        const refreshToken = jwt.sign({ id: _id }, this.JWT_REFRESH_KEY, {
            expiresIn: "3d",
        })

        return {accessToken, refreshToken}
        } catch (error) {
            throw error
        }
    }

    async verifyJwt(token: string): Promise<IUser | { userId: string; email: string; iat: number; exp: number; }> {
        try {
            return jwt.verify(token, this.JWT_VERIFICATION_KEY) as IUser

        } catch (error) {
            throw error
        }
    }

    async forgotPasswordToken(userId: string, email: string): Promise<string> {
       try {
        const token =  jwt.sign({ userId: userId, email: email}, this.JWT_VERIFICATION_KEY, {
            expiresIn: "10m"
        })
        
        return token
       } catch (error) {
            throw error
       }
    }
}