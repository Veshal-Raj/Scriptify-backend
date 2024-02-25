import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injections";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import recaptcha from "../middlewares/reCaptcha";


export function userRoute(router: Route) {
    
    router.post(
        '/register',
        recaptcha,
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            userController.registerUser(req, res, next)
        })
    )

    router.post(
        '/verify-otp',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            userController.createUser(req, res, next)
        })
    )

    router.post(
        '/login',
        recaptcha,
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            userController.login(req, res, next)
        })
    )

    router.get('/resend-otp')


    return router
}