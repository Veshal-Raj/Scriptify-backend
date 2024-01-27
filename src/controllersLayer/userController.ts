import { Req, Res, Next } from "../infrastructureLayer/types/serverPackageTypes";
import { UserUsecase } from "../usecasesLayer/usecase/userUseCase";
import { IUserRepository } from "../usecasesLayer/interface/repository/userRepository";
import { redis } from "../infrastructureLayer/webserver/config/redis";


export class UserController {
    private userUseCase: UserUsecase
    private userRepository: IUserRepository

    constructor(userUseCase: UserUsecase, userRepository: IUserRepository){

        this.userUseCase = userUseCase
        this.userRepository = userRepository
    }

    // validate email
    private validateEmail(email: string):boolean {
        let emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    private validatePassword(password: string): boolean {
        // Password should be at least 6 characters long.
        const isLengthValid = password.length >= 6;
    
        // Password should contain at least one digit.
        const containsDigit = /\d/.test(password);
    
        // Password should contain at least one alphabet.
        const containsAlphabet = /[a-zA-Z]/.test(password);
    
        // Password should contain at least one special character.
        const containsSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        // Password should not contain spaces.
        const noSpaces = !/\s/.test(password);
    
        // All validation conditions should be true for the password to be considered valid.
        return isLengthValid && containsDigit && containsAlphabet && containsSpecialCharacter && noSpaces;
    }
    

    async createUser(req: Req, res: Res, next: Next) {
        console.log('inside userController')
        try {
            
            let {firstname, lastname, email, password, confirmpassword} = req.body
            
            firstname = firstname? firstname.trim(): null
            lastname = lastname? lastname.trim(): null
            let name = firstname+" "+lastname
            email = email ? email.trim(): null
            password = password ? password.trim() : null
            confirmpassword = confirmpassword ? confirmpassword.trim() : null
            

            if (!name || !email || !password || !confirmpassword) {
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

            if (!this.validatePassword(password)) {
                return res.status(400).json({
                    success: false,
                    message: "Password should be at least 6 characters long"
                });
            }

            if (password !== confirmpassword) {
                return res.status(400).json({
                    success: false,
                    message: "password mismatches"
                })
            }

            const user = {...req.body}
         
            user.name = firstname+" "+lastname
            delete user.confirmPassword
            delete user.firstname
            delete user.lastname

            // store user data in Redis
            redis.hmset(email, user) // 'email' is a unique identifier

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