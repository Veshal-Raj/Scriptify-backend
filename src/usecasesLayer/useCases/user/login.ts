import IUser from "../../../entitiesLayer/user";
import { Next, Ilogger } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IcloudSession } from "../../interface/services/IcloudSession";
import { IHashpassword } from "../../interface/services/IhashPassword";
import { IJwt, IToken } from "../../interface/services/Ijwt.types";
import { ErrorHandler } from "../../middlewares/errorHandler";



export const login = async (
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    token: IJwt,
    cloudSession:IcloudSession,
    email: string,
    password: string,
    next: Next,
    logger: Ilogger
): Promise<{ user: IUser; tokens: IToken} | void> => {
    try {
        console.log('email in usecase engine --- ', email)
        console.log('password in usecase engine -- >>', password)
        const user = await userRepository.findUserByEmail(email);
        console.log('user in userUseCase -->> ', user)
        if (!user) return next(new ErrorHandler(400, 'invalid email', logger ))

        if (user.status === 'freeze') next (new ErrorHandler(400, 'access has been denied.', logger))

        const hashPassword = user.personal_info.password

        const result = await bcrypt.comparePassword(password, hashPassword)

        if (!result) next(new ErrorHandler(400, 'invalid password', logger))

        user.personal_info.password = ''
        console.log('before createAccessAndRefreshToken')
        const tokens = await token.createAccessAndRefreshToken(user?._id as string);
        console.log('tokens -->>>> ', tokens)
        console.log(user?._id,'<------>' ,user)
       let a =  await cloudSession.createUserSession(user?._id as string, user)
       console.log(a)
       console.log('cloudsession.createUserSession is sucessfull')
       console.log(tokens)
        return { user, tokens }
    } catch (error) {
        throw error
    }
}