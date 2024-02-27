import { Next, Req, Res } from "../infrastructureLayer/types/serverPackageTypes";
import { IAdminUseCase } from "../usecasesLayer/interface/usecase/adminUseCase";



export class AdminController {
    private readonly adminUseCase: IAdminUseCase;

    constructor(adminUseCase:IAdminUseCase) {
        this.adminUseCase = adminUseCase
    }

    async getAllUser(req: Req, res: Res, next: Next) {
        try {
            const result = await this.adminUseCase.getAllUser(next);
            console.log('result --->> ', result)
            res.status(200).json({ success: true, message: 'users have been fetched successfully', data: result})
        } catch (error) {
            throw error
        }
    }
}