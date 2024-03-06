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
    
        // router.get('/create-blog', verifyJWT, (req,res) => {
        //       let authorId = req.user;
        //       let {title, des, banner, tags, content, draft } = req.body;
        //       if(!title.length) {
        //           return res.status(403).json({ error: 'You must provide a title to publish the blog' })
        //       }
        //       if (!des.length || des.length > 200) {
        //           return res.status(403).json({ error: 'You must provide blog description under 200 characters' })
        //       }
        //       if (!banner.length) {
        //           return res.status(403).json({ error: 'You must provide banner for this blog' })
        //       }
        //       if (!content.blocks.length) {
        //           return res.status(403).json({ error: 'You must provide a blog content before publish it' })
        //       }
        //       if (!tags.length || tags.length > 10) {
        //           return res.status(403).json({ error: 'You must provide tags in order to publish the blog, Maximum 10' })
        //       }
        //       tags = tags.map(tag => tag.toLowerCase())
        //       let blog_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-').trim() + nanoid()
     
        //       let blog = new Blog({
        //           title, des, banner, content, tags, author: authorId, blog_id, draft: Boolean(draft)
        //       })
     
        //       blog.save().then(blog => {
        //           let incrementVal = draft ? 0: 1;
        //           User.findOneAndUpdate({ _id: authorId}, {$inc: {"account_info.total_posts": incrementVal}, $push: { "blogs": blog._id }})
        //          .then(user => {
        //                return res.status(200).json({ id: blog.blog_id })
        //           }).catch(err => {
        //               return res.status(500).json({ error: 'Failed to update total posts number' })
        //           })
        //         }).catch(err => {
        //             return res.status(500).json({error: err.message })
        //         })
        // })
     

    return router
}