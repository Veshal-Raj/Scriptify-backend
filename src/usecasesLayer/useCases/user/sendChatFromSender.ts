import { IConversation } from "../../../@types/general/chatData";
import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const sendChatFromSender = async (
    data: IConversation,
    userRepository: IUserRepository,
    next: Next,
    logger: Ilogger
) => {
    try {
        console.log('reached inside engine usecase sentchatfromsender')
        const response = await userRepository.sendChat(data)
        return response
    } catch (error: unknown | never) {
        return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', logger));
    }
}