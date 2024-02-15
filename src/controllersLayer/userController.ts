import { Req, Res, Next } from "../infrastructureLayer/types/serverPackageTypes";
import { UserUseCase } from "../usecasesLayer/useCases/userUseCase";
import { validateEmail, validatePassword, validateUsername } from "./middlewares/inputValidation";
import { ErrorHandler } from "../usecasesLayer/middlewares/errorHandler";



export class UserController {
    private userUseCase: UserUseCase;

    constructor(userUseCase: UserUseCase){
        this.userUseCase = userUseCase;
    }

    async registerUser(req: Req, res: Res, next: Next) {
        console.log('reached inside the registerUser in userController')
        try {
            // input validation
            const { fullname, email, password } = req.body;
            console.log('body -- > ', req.body)
            const validationErrors: string[] = [];
            
            if (!validateUsername(fullname)) {
                
                validationErrors.push("Invalid username format");
            }
            if (!validateEmail(email)) {
                validationErrors.push("Invalid email format");
            }
            if (!validatePassword(password)) {
                validationErrors.push("Invalid password format");
            }

            if (validationErrors.length > 0) {
                return next(validationErrors);
            }


            const token = await this.userUseCase.registerUser(req.body, next)

            console.log('<-------------------------- token in userController ------------------------>')
            console.log( token)
            console.log('<--------------------------------------------------- ------------------------>')

           
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "No verification token found"
                });
            }


            res.cookie("verficationToken", token, {
                httpOnly: true,
                sameSite: "strict",
                expires: new Date(Date.now() + 30*60*1000)
            })

            res.status(200).json({
                success: true,
                message: "verification otp has been send to the mail"
            })

        } catch (error: unknown | never) {
            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    async createUser(req: Req, res: Res, next: Next) {
        try {
            // input validation
            // const { fullname, email, password } = req.body;
            // const validationErrors: string[] = [];
            
            // if (!validateUsername(fullname)) {
            //     validationErrors.push("Invalid username format");
            // }
            // if (!validateEmail(email)) {
            //     validationErrors.push("Invalid email format");
            // }

            // if (!validatePassword(password)) {
            //     validationErrors.push("Invalid password format");
            // }


            // if (validationErrors.length > 0) {
            //     console.log('reached inside validate errors length')
            //     return next(validationErrors);
            // }

            console.log('dddddddddddddddddddddddddddddddddddddddddd',req.cookies)
            console.log(req.body)
            
            let token = req.cookies.verficationToken;
            console.log('token in the userController ----- > ', token)
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "No verification token found"
                });
            }
            const result = await this.userUseCase.createUser(
                req.body.otp,
                token,
                next
            );
                console.log('result in the userController ------>>>>>>> ', result)
            if (result === null) res.status(401).json({message: 'otp mismatch'})
            res.clearCookie("verificationToken").send(result)
        } catch (error: unknown | never) {
            console.log('reached here')
            return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }
}