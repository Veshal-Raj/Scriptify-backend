import { ObjectId } from "mongoose";

interface Notification {
    _id: ObjectId;
    User_id: ObjectId | null;
    Content: string | null;
    Type: string | null;
    Status: 'unread' | 'read' | null;
    CreatedAt: Date | null;
}

export default Notification;