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

  router.post(
    "/logout",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.logout(req, res, next)
    })
  )

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

  router.get(
    "/fetchAllUsers",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.fetchAllUsers(req, res, next)
    })
  )

  router.post(
    "/sendChat",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.sendChat(req, res, next)
    })
  )

  router.get(
    "/getChat",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.getChat(req, res, next)
    })
  )

  router.post(
    "/registerNotificationToken",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.registerNotificationToken(req, res, next)
    })
  )

  router.get(
    "/fetchAllUserNotification",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.fetchAllUserNotification(req, res, next)
    })
  )

  router.post(
    "/notificationSeen",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.notificationSeen(req, res, next)
    })
  )

  // notificationCount
  router.get(
    "/notificationCount", 
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.notificationCount(req, res, next)
    })
  )
  
  router.get(
    "/chatUserSearch",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.chatUserSearch(req, res, next)
    })
  )

  router.post(
    "/editUserProfile",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.editUserProfile(req, res, next)
    })
  )

  router.put(
    "/changePassword",
    recaptcha,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.changePassword(req, res, next)
    })
  )

  router.post(
    "/forgotPasswordEmail",
    recaptcha,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.forgotPasswordEmail(req, res, next)
    })
  )

  router.post(
    "/forgotPasswordOtp",
  catchAsyncErrors((req: Req, res: Res, next: Next) => {
    userController.forgotPasswordOtp(req, res, next)
  })
  )

  router.post(
    "/changePasswordNotLoggedIn",
    recaptcha,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.changePasswordNotLoggedIn(req, res, next)
    })
  )

  router.get(
    "/resendOtp",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.resendOtp(req, res, next)
    })
  );

  router.post(
    "/googleAuth",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.googleAuth(req, res, next)
    })
  )
  return router;
}
