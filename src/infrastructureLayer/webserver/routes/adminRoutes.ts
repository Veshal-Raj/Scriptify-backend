import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";



export function adminRoute(router: Route) {
    router.get(
        '/getAllUsers',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            
        })
    )
}