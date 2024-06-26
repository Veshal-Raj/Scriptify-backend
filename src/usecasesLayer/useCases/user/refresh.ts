import IUser from "../../../entitiesLayer/user";
import { Req } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IcloudSession } from "../../interface/services/IcloudSession";
import { IJwt, IToken } from "../../interface/services/Ijwt.types";
import { ErrorHandler } from "../../middlewares/errorHandler";


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
    } catch (error: unknown | never) {
        throw error
        // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}