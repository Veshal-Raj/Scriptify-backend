import PaymentModel from "../../../models/paymentMode";



export const reciptUrlForUser = async (
    userId: string
) => {
    try {
        // Find the payment document for the given user ID
        const payment = await PaymentModel.findOne({ userId });

        // If payment document is found, return the receipt URL
        if (payment) {
            return payment.receipt_url;
        } else {
            // Payment not found for the user ID
            return null;
        }
    } catch (error) {
        console.error('Error fetching receipt URL:', error);
        return null;
    }
}