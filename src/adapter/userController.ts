import { Request, Response } from "express";
import Userusecase from "../use_case/userUsecase";
import User from "../domain/user";


class userController {
    private userUsecase: Userusecase
    constructor (userUsecase: Userusecase) {
        this.userUsecase = userUsecase
    }

    async signUp(req: Request, res: Response) {
        try {
            console.log('reached inside userController --> Adapter')
            const user = req.body
            console.log('user --> ',user)
            const userFound = await this.userUsecase.emailExistCheck(user.Email)
          console.log(userFound, "---99----")
            if (userFound == null) {   
            const userSave = await this.userUsecase.saveUser(user)
            res.status(200).json({data: true, userSave})
            } else {
                res.status(200).json({data: false, message: 'Email Id already in use', userFound: userFound})
            }

        } catch (error) {
            
        }
    }
}


export default userController