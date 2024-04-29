import { CloudSession } from "../../../infrastructureLayer/services/cloudSession";
import { Ilogger, Next, Req, Res } from "../../../infrastructureLayer/types/serverPackageTypes";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const logout = async (
    cloudSession: CloudSession,
    req: Req,
    res: Res,
    next: Next,
    logger: Ilogger
) => {
    try {
        const checkUser = await cloudSession.getUser(req.body.userId as string)
        console.log('check user --  ', checkUser)
        const clearUserSession = await cloudSession.clearUserSession(req.body.userId as string)
        console.log('clear user session --- ', clearUserSession)
        
        
        if (clearUserSession !== 1) return next(new ErrorHandler(500,  "something went wrong", logger));
        res.clearCookie("verificationToken")
        
        
    }catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}