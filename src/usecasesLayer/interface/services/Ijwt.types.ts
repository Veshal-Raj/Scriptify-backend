import IUser from "../../../entitiesLayer/user";



export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface IJwt {
    createVerificationJWT(payload: IUser): Promise<string>;
    createAccessAndRefreshToken(id: string): Promise<IToken>;
    verifyJwt(token: string): Promise< | IUser | { userId: string; email: string; iat: number; exp: number} >;
    forgotPasswordToken(userId: string, email: string): Promise<string>
}