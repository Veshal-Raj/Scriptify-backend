
interface IMessage {
    sender:any,
    receiver: any,
    content: string;
    chat: any;
    readBy: any;
    createdAt: Date;
    updatedAt: Date;
}


export { IMessage }