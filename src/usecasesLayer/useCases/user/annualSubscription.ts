import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ILogger } from "../../interface/services/IerrorLog";
import { IPaymentService } from "../../interface/services/IpaymentService";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const annualSubscription = async (
    userId: string,
    subscriptionType: string,
    next: Next,
    userRepository: IUserRepository,
    paymentService: IPaymentService,
    logger: ILogger
) => {
    try {
        const response = await userRepository.annuallySubscription(userId, subscriptionType, paymentService)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}