import IUser from "../../entitiesLayer/user";
import { IJwt, IToken } from "../../usecasesLayer/interface/services/Ijwt.types";
import jwt from "jsonwebtoken";
require('dotenv').config()

export class JWTtoken implements IJwt {
    JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
    JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
    JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";
    
    async createVerificationJWT(payload: IUser): Promise<string> {      
        const verifyToken = jwt.sign(payload, this.JWT_VERIFICATION_KEY, {
            expiresIn: "15m",
        })
       
        return verifyToken
    }

    async createAccessAndRefreshToken(_id: string): Promise<IToken> {
        const accessToken = jwt.sign({ id: _id }, this.JWT_ACCESS_KEY, {
            expiresIn: "5h",
        });
        const refreshToken = jwt.sign({ id: _id }, this.JWT_REFRESH_KEY, {
            expiresIn: "3d",
        })

        return {accessToken, refreshToken}
    }

    async verifyJwt(token: string): Promise<IUser | { userId: string; email: string; iat: number; exp: number; }> {
        return jwt.verify(token, this.JWT_VERIFICATION_KEY) as IUser
    }

    async forgotPasswordToken(userId: string, email: string): Promise<string> {
        const token =  jwt.sign({ userId: userId, email: email}, this.JWT_VERIFICATION_KEY, {
            expiresIn: "10m"
        })
        
        return token
    }
}