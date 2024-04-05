import { IPaymentResponse } from "../request_response/payment";

export interface IPaymentService {
    pay(userId: string, subscriptionType: string): Promise<IPaymentResponse | void>
    webHook(body: any, sig: any): Promise<any>
}