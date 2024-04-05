export interface IPaymentResponse {
    status?: number;
    message?: string;
    data: string;
    sessionId: string
}

export type TPaymentRequest = {
    items: any;
    userId: string;
    subscriptionType: string;
}