interface IPayment {
    userId: any,
    subscriptionId: string,
    subscriptionType: string,
    subscribedDate: Date,
    subscriptionExpirationDate: Date,
    receipt_url: string
}

export default IPayment