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
            
            let {firstname, lastname, email, password, confirmPassword} = req.body
            
            firstname = firstname? firstname.trim(): null
            lastname = lastname? lastname.trim(): null
            let name = firstname+" "+lastname
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

            if (!this.validatePassword(password)) {
                return res.status(400).json({
                    success: false,
                    message: "Password should be at least 6 characters long"
                });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "password mismatches"
                })
            }

            const user = {...req.body}
         
            user.name = firstname+" "+lastname
            let reCaptchaToken = user.token
            delete user.confirmPassword
            delete user.firstname
            delete user.lastname

        
            console.log('checking the user variable whether the data is present or not', user)
            const newUserResponse = await this.userUseCase.registerUser(user);
            console.log('newUserResponse --> ', newUserResponse)
      if (newUserResponse.success) {
        // Set the user data in the cookie
        const userData = newUserResponse.userData;
        
        console.log('user data --- ', userData)
        
        res.cookie("verificationToken", userData, {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 30 * 60 * 1000),
          }).json({message: 'verification Token'});        
    }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "server error"
            })
        }
    }
}