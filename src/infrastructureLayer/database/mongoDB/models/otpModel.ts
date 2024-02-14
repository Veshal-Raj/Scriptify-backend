import mongoose, { Model, Schema } from "mongoose";
import { IOtp } from "../../../../entitiesLayer/otp";

const otpSchema: Schema<IOtp> = new Schema<IOtp>({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now, expires: 2*60 }, // Automatically delete document after 120 seconds
    createdAt: { type: Date, default: Date.now }
});

const OtpModel: Model<IOtp> = mongoose.model<IOtp>('Otp', otpSchema);

export default OtpModel;