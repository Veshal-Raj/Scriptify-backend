import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injections";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import recaptcha from "../middlewares/reCaptcha";

export function userRoute(router: Route) {
  router.post(
    "/register",
    recaptcha,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.registerUser(req, res, next);
    })
  );

  router.post(
    "/verify-otp",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.createUser(req, res, next);
    })
  );

  router.post(
    "/login",
    recaptcha,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.login(req, res, next);
    })
  );

  router.get("/resend-otp");

  router.get(
    "/get-upload-url",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.generateUploadURL(req, res, next);
    })
  );

  router.post(
    "/create-blog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.createBlog(req, res, next);
    })
  );

  router.get(
    "/latest-blog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      const page = req.query.page ? parseInt(req.query.page.toString(), 10) : 1;

      userController.latestBlog(page, req, res, next);
    })
  );

  router.get(
    "/trending-blog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.trendingBlog(req, res, next);
    })
  );

  router.get(
    "/explore-tags",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.exploreTags(req, res, next);
    })
  );

  router.post(
    "/filterbyTags",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.filterByTags(req, res, next);
    })
  );

  router.get(
    "/search",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.search(req, res, next);
    })
  );

  router.post(
    "/get-profile",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.getProfile(req, res, next);
    })
  );

  router.get(
    "/fetchUserBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.fetchUserBlogs(req, res, next);
    })
  );

  router.get(
    "/fetchSingleBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.fetchSingleBlog(req, res, next);
    })
  );

  router.post(
    "/fetchSimilarBlogs",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.fetchSimilarBlogs(req, res, next);
    })
  );

  router.post(
    "/increaseReadCount",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.increaseReadCount(req, res, next);
    })
  );

  router.post(
    "/followUser",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.followUser(req, res, next);
    })
  );

  router.post(
    "/unfollowUser",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.unfollowUser(req, res, next);
    })
  );

  router.post(
    "/likeBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.likeBlog(req, res, next);
    })
  );

  router.post(
    "/unlikeBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.unLikeBlog(req, res, next);
    })
  );

  router.get(
    "/initialLike",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.initialLike(req, res, next);
    })
  );

  router.post(
    "/saveBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.saveBlog(req, res, next);
    })
  );

  router.post(
    "/unSaveBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.unSaveBlog(req, res, next);
    })
  );

  router.get(
    "/savedBlogs",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.savedBlogs(req, res, next);
    })
  );

  router.get(
    "/listFollowers",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.listFollowers(req, res, next);
    })
  );

  router.get(
    "/listFollowings",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.listFollowings(req, res, next);
    })
  );

  router.post(
    "/addComment",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.addComment(req, res, next)
    })
  )

  /**
 *  router.post(
      '/addComment', (req, res) => {
        let userId = req.user
        let { _id, comment, blog_author } = req.body

        if (!comment.length) {
          return res.status(403).json({ error: 'Write something to leave a comment!'})
        }

        let commentObj = new Comment({
          blog_id: _id, blog_author, comment, commented_by: user_id
        })

        commentObj.save().then(commentFile => {
          let { comment, commentAt, children } = commentFile
          Blog.findOneAndUpdate({_id}, { $push: {"comments", commentFile._id }, $inc : {"activity.total_comments": 1},
           "acitivity.total_parents_comments": 1})
           .then(blog => { console.log('New comment created')})

           let notificationObj = {
              type: "comment",
              blog: _id,
              notification_for: blog_author,
              user: user_id,
              comment:commentFile._id
           }

           new Notification(notificaitonObj).save().then(notification => console.log('new notification created'))

           return res.status(200).json({ 
            comment, commentedAt, _id: commentFile._id, user_id, children
           })
        })
      }
    ) 
 * 
 * 
 */

  router.get(
    '/initialComments',
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.initialComments(req, res, next)
    }) 
  )

  router.post(
    "/replyComment",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.addReplyComment(req, res, next)
    })
  )

  router.post(
    "/reportBlog",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.reportBlog(req, res, next)
    })
  )

  router.post(
    "/checkUserSubscribed",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.checkIsSubscribed(req,res,next)
    })
  )

  router.post(
    "/monthlySubscription",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.monthlySubscription(req,res, next)
    })
  )

  router.post(
    "/annualSubscription",
    catchAsyncErrors((req:Req, res: Res, next: Next) => {
      userController.annualSubscription(req,res, next)
    })
  )

  router.post(
    "/webhook",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.webhook(req, res, next)
    })
  )

  router.get(
    "/reciptUrl",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.reciptUrl(req, res, next)
    })
  )

  return router;
}
