import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IPaymentService } from "../../interface/services/IpaymentService";
import { ErrorHandler } from "../../middlewares/errorHandler";


export const monthlyUserSubscription = async (
    userId: string,
    subscriptionType: string,
    next: Next,
    userRepository: IUserRepository,
    paymentService: IPaymentService,
    logger: Ilogger
) => {
    try {
        const response = await userRepository.monthlySubscription(userId, subscriptionType, paymentService)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}