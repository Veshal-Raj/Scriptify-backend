import IUser from "../../../entitiesLayer/user";
import { Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IcloudSession } from "../../interface/services/IcloudSession";
import { IJwt, IToken } from "../../interface/services/Ijwt.types";


export const refresh = async (
    cloudSession: IcloudSession,
    jwtToken: IJwt,
    req: Req,
) => {
    try {
        console.log('refresh -->> ', req.user);
        const token = await jwtToken.createAccessAndRefreshToken(
            req.user?._id as string
        );
        await cloudSession.createUserSession(
            req.user?._id as string,
            req.user as IUser
        )
        return token as IToken;
    } catch (error) {
        throw error
    }
}