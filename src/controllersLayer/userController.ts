import { Req, Res, Next } from "../infrastructureLayer/types/serverPackageTypes";
import { UserUseCase } from "../usecasesLayer/useCases/userUseCase";
import { validateEmail, validatePassword, validateUsername } from "./middlewares/inputValidation";
import { ErrorHandler } from "../usecasesLayer/middlewares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "./middlewares/tokenOptions";



export class UserController {
    private userUseCase: UserUseCase;

    constructor(userUseCase: UserUseCase){
        this.userUseCase = userUseCase;
    }

    async registerUser(req: Req, res: Res, next: Next) {
        console.log('reached inside the registerUser in userController')
        try {
            // input validation
            const { username, email, password } = req.body;
            console.log('body -- > ', req.body)
            const validationErrors: string[] = [];
            
            if (!validateUsername(username)) {
                
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
            throw error
            // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    async createUser(req: Req, res: Res, next: Next) {
        try {
                //   console.log('request incomming --->>> ', req)
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
            if (result) res.clearCookie("verificationToken").send(result)
            else res.status(401).json({message: 'otp mismatch'})
        } catch (error: unknown | never) {
            throw error
            // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', ));
        }
    }


    async login(req: Req, res: Res, next: Next) {
        try {
            const { email, password } = req.body;

            console.log('body -- > ', req.body)

            const validationErrors: string[] = [];

            if (!validateEmail(email)) {
                validationErrors.push("Invalid email format");
            }
            if (!validatePassword(password)) {
                validationErrors.push("Invalid password format");
            }

            const result = await this.userUseCase.login(req.body, next)
            console.log('result from usecsae login -->> ',result)

            res.cookie('accessToken', result?.tokens.accessToken, accessTokenOptions);
            res.cookie('refreshToken', result?.tokens.accessToken, refreshTokenOptions)

            res.status(200).json(result?.user)

        } catch (error: unknown | never) {
            throw error
            // return next(new ErrorHandler(500, error instanceof Error ? error.message : 'Unknown error', ));
        }
    }


    async generateUploadURL(req: Req, res: Res, next: Next) {
        try {
            const url = await this.userUseCase.generateUploadURL(next)

            res.status(200).json({ uploadURL: url})
        } catch (error: unknown | never) {
            throw error
        }
    }
}