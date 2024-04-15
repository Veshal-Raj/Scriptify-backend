import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const notificationSeenByUser = async (
    notificationId: string,
    next: Next,
    userrepository: IUserRepository,
    logger: ILogger
) => {
    try {
        const response = await userrepository.notificationSeen(notificationId)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}