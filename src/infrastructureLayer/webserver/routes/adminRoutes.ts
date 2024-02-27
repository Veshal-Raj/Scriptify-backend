import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { adminController } from "./injections/injections";



export function adminRoute(router: Route) {
    router.get(
        '/getAllUsers',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            adminController.getAllUser(req, res, next)
        })
    )

    router.post(
        '/changeUserStatus/:id',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            // console.log('request ----- ', req)
            // console.log('request url ----- ', req.url)
            console.log('request ----- ', req.params.id)
            // console.log('request ----- ', req)
            adminController.changeUserStatus(req, res, next)
        })
    )

    return router;
}