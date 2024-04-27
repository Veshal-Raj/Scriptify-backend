import mongoose, { Model, Schema } from "mongoose";
import INotification from "../../../../entitiesLayer/notification";


const notificationSchema: Schema<INotification> = new Schema<INotification>({
    type: {
        type: String,
        enum: ["like", "comment", "save", "message", "follow"],
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
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
    message: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const NotificationModel = mongoose.model<INotification>("Notification", notificationSchema);
export default NotificationModel;