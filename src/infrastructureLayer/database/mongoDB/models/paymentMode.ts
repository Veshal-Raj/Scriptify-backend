import mongoose, {Model, Schema} from "mongoose";
import IPayment from "../../../../entitiesLayer/payment"; 


const paymentSchema: Schema<IPayment> = new Schema<IPayment>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subscriptionId: {
        type: String,
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ['annually', 'monthly'],
        required: true
    },
    subscribedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    subscriptionExpirationDate: {
        type: Date,
        default: function() {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 30);
            return currentDate;
        },
    },
    receipt_url: {
        type: String,
        default: ''
    }
})

const PaymentModel: Model<IPayment> = mongoose.model<IPayment>('Payment', paymentSchema)

export default PaymentModel