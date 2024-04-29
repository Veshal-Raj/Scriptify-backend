import { IPaymentService } from "../../../../../../usecasesLayer/interface/services/IpaymentService";

export const monthlyUserSubscription = async (
    userId: string,
    subscriptionType: string,
    paymentService: IPaymentService
) => {
    console.log(paymentService, userId, subscriptionType)
    const paymentData = await paymentService.pay(userId,subscriptionType)
    
    console.log('----- paymnetdata  ---', paymentData)
    return paymentData?.data
}