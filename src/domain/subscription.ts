import { ObjectId } from "mongoose";

interface Subscription {
    _id: ObjectId;
    StartDate: Date;
    EndDate: Date;
    PaymentStatus: string | null;
    Type: 'monthly' | 'yearly' | null;
    IsActive: boolean | null;
}

export default Subscription;