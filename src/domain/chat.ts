import { ObjectId } from "mongoose";

interface Chat {
    _id: ObjectId;
    Sender: ObjectId;
    Messages: ObjectId[];
    Receiver: ObjectId;
    Date: Date;
}

export default Chat;