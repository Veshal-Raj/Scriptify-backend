import IUser from "../../../entitiesLayer/user";
import { Next, Ilogger } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IHashpassword } from "../../interface/services/IhashPassword";
import { IJwt, IToken } from "../../interface/services/Ijwt.types";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const login = async (
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    token: IJwt,
    email: string,
    password: string,
    next: Next,
    logger: Ilogger
): Promise<{ user: IUser; tokens: IToken} | void> => {
    try {
        const user = await userRepository.findUserByEmail(email);

        if (!user) return next(new ErrorHandler(400, 'invalid email', logger ))

        if (user.status === 'freeze') next (new ErrorHandler(400, 'access has been denied.', logger))

        const hashPassword = user.personal_info.password

        const result = await bcrypt.comparePassword(password, hashPassword)

        if (!result) next(new ErrorHandler(400, 'invalid password', logger))

        user.personal_info.password = ''

        const tokens = await token.createAccessAndRefreshToken(user?._id as string);
        return { user, tokens }
    } catch (error) {
        throw error
    }
}