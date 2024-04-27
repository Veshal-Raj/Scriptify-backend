import PaymentModel from "../../../models/paymentMode";
import UserModel from "../../../models/userModel";

export const savePaymentData = async (
  paymentMethod: string,
  userId: string,
  receipt_url: string,
  subscriptionType: string
) => {
  try {
    if (subscriptionType == "monthly") {
      const user = await UserModel.findById(userId);
      if (!user) return null;
      const userIdFromDb = user._id;
      const subscriptionId = paymentMethod;
      const SubscriptionType = subscriptionType;
      const receiptUrl = receipt_url;

      const paymentRecord = new PaymentModel({
        userId: userIdFromDb,
        subscriptionId: subscriptionId,
        subscriptionType: SubscriptionType,
        subscribedDate: new Date(),
        subscriptionExpirationDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        receipt_url: receiptUrl,
      });
      await paymentRecord.save();

      const paymentRecordId = paymentRecord._id;

      if (user) {
        await UserModel.updateOne(
          { _id: userId },
          {
            $set: {
              subscriptionId: paymentRecordId,
              isSubscribed: true,
            },
          }
        );
      }
    } else if (subscriptionType == "annually") {
      const user = await UserModel.findById(userId);
      if (!user) return null;
      const userIdFromDb = user._id;
      const subscriptionId = paymentMethod;
      const SubscriptionType = subscriptionType;
      const receiptUrl = receipt_url;

      const paymentRecord = new PaymentModel({
        userId: userIdFromDb,
        subscriptionId: subscriptionId,
        subscriptionType: SubscriptionType,
        subscribedDate: new Date(),
        subscriptionExpirationDate: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        ),
        receipt_url: receiptUrl,
      });

      await paymentRecord.save();

      const paymentRecordId = paymentRecord._id;

      if (user) {
        await UserModel.updateOne(
          { _id: userId },
          {
            $set: {
              subscriptionId: paymentRecordId,
              isSubscribed: true,
            },
          }
        );
      }
    } else return;
  } catch (error) {
    throw error;
  }
};
