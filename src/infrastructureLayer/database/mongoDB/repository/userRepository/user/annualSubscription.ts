import { IPaymentService } from "../../../../../../usecasesLayer/interface/services/IpaymentService";
import UserModel from "../../../models/userModel";
import PaymentModel from "../../../models/paymentMode";

export const annualSubscription = async (
    userId: string,
    subscriptionType: string,
    paymentService: IPaymentService
) => {
    const paymentData = await paymentService.pay(userId ,subscriptionType)
    console.log('payment Data ', paymentData)

    // if (paymentData && paymentData.sessionId) {
    //    const a = await UserModel.findByIdAndUpdate(userId, { subscriptionId: paymentData.sessionId });
    // console.log(a)
    // const paymentRecord = new PaymentModel({
    //     userId: userId, // Assign the userId from UserModel
    //     subscriptionId: paymentData.sessionId,
    //     subscriptionType: subscriptionType,
    //     subscribedDate: new Date(), // Set subscribedDate to current date
    //     subscriptionExpirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // Set subscriptionExpirationDate to 365 days from now
    // });

    // // Save the payment record
    // await paymentRecord.save();
    // console.log("Payment record saved:", paymentRecord);
    // }

    return paymentData?.data
}