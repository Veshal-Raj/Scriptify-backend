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

    router.get(
        '/getAllBlogs',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            adminController.getAllBlogs(req, res, next)
        })
    )

    router.post(
        '/changeBlogStatus',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            adminController.changeBlogStatus(req, res, next)
        })
    )

    router.get(
        '/getAllReports',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            adminController.getAllReports(req, res, next)
        })
    )

    router.get(
        '/getUserSubscribedData',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            adminController.getUserSubscribedData(req, res, next)
        })
    )

    router.get(
        '/getTotalBlogData',
        catchAsyncErrors((req: Req, res: Res, next: Next) => {
            adminController.getTotalBlogData(req, res, next)
        })
    )

    return router;
}