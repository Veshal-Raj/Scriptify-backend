import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injections";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";


export function userRoute(router: Route) {
    
    router.post(
        '/register',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            userController.registerUser(req, res, next)
        })
    )

    return router
}