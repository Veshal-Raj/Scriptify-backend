import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const webhookUseCaseEngine = async (
    body: any,
    sig: any,
    next: Next,
    userRepository: IUserRepository,
    logger: ILogger
) => {
    try {
        const response = await userRepository.webhook( body, sig )
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}