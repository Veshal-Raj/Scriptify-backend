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

    return router;
}