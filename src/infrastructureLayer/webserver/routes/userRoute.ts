import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injections";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import recaptcha from "../middlewares/reCaptcha";
// import { nanoid } from "nanoid";

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

    router.get('/get-upload-url', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.generateUploadURL(req, res, next)
    }))


    router.post('/create-blog', catchAsyncErrors((req: Req,res: Res, next: Next) => {
        userController.createBlog(req, res, next)
    }))
    
    //     router.get('/latest-blog', (req, res) => {
    //         const maxLimit = 5;
            
    //         BlogModel.find({ draft: false })
    //         .populate("author", "personal_info.profile_img personal_info.username -id")
    //         .sort({ "publishedAt": -1 })
    //         .select("blog_id title des banner activity tags publishedAt -id")
    //         .limit(maxLimit)
    //         .then(blogs => {
    //             return res.status(200).json({ blogs })
    //         })
    //         .catch(err => {
    //             return res.status(500).json({ error: err.message })
    //         })
    //     })

    router.get('/latest-blog', catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.latestBlog(req, res, next)
    }))
     

    return router
}