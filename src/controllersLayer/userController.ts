import { Req, Res, Next } from "../infrastructureLayer/types/serverPackageTypes";
import { UserUsecase } from "../usecasesLayer/usecase/userUseCase";
import { IUserRepository } from "../usecasesLayer/interface/repository/userRepository";

export class UserController {
    private userUseCase: UserUsecase
    private userRepository: IUserRepository

    constructor(userUseCase: UserUsecase, userRepository: IUserRepository){

        this.userUseCase = userUseCase
        this.userRepository = userRepository
    }

    // validate email
    validateEmail(email: string):boolean {
        let emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    async createUser(req: Req, res: Res, next: Next) {
        console.log('inside userController')
        try {
            let {name, email, password, confirmPassword} = req.body

            name = name ? name.trim() : null
            email = email ? email.trim(): null
            password = password ? password.trim() : null
            confirmPassword = confirmPassword ? confirmPassword.trim() : null

            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'missing required fields'
                })
            }

            if (name.length < 3) {
                return res.status(400).json({
                    success: false,
                    message: 'name should have atleast 3 characters'
                })
            }

            if (!this.validateEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: "invalid email format"
                })
            }

            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "password mismatches"
                })
            }

            const user = {...req.body}
            delete user.confirmPassword
            const newUser = await this.userUseCase.createUser(user)
            console.log('newUser -------> ', newUser)
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "server error"
            })
        }
    }
}