import { IConversation } from "../../../../../../@types/general/chatData"
import ChatModel from "../../../models/chatModel"
import Message from "../../../models/messageModel"


export const sendChatByUser = async (
    data: IConversation
) => {
    try {
        // console.log('data ------------- ', data)
        let chat = await ChatModel.findOne({
            users: { $all: [data.sender.id, data.receiver.id]}
        })

        if (!chat) {
            chat = await ChatModel.create({
                users: [data.sender.id, data.receiver.id]
            })
        }

        const message = await Message.create({
            sender: data.sender.id,
            receiver: data.receiver.id,
            content: data.message,
            chat:chat._id
        })

        chat.latestMessage = message._id
        await chat.save()

        console.log('Chat and message created successfully');

    } catch (error) {
        throw error
    }
}