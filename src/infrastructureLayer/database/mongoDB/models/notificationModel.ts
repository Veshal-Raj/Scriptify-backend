import mongoose, { Model, Schema } from "mongoose";
import INotification from "../../../../entitiesLayer/notification";


const notificationSchema: Schema<INotification> = new Schema<INotification>({
    type: {
        type: String,
        enum: ["like", "comment", "reply"],
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    notification_for: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }, 
    replied_on_comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Create and export the model
const NotificationModel = mongoose.model<INotification>("Notification", notificationSchema);
export default NotificationModel;