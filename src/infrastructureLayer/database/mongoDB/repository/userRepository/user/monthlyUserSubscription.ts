import { IPaymentService } from "../../../../../../usecasesLayer/interface/services/IpaymentService";

export const monthlyUserSubscription = async (
    userId: string,
    subscriptionType: string,
    paymentService: IPaymentService
) => {
    const paymentData = await paymentService.pay(userId,subscriptionType)
    

    return paymentData?.data
}