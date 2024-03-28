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
            userController.filterByTags(req, res, next)
        })
    )

    router.get(
      "/search",
      catchAsyncErrors((req: Req, res:Res, next: Next) => {
        userController.search(req, res, next)
      })
    )

    router.post(
      "/get-profile", 
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.getProfile(req, res, next)
      })
    )

    router.get(
      "/fetchUserBlog",
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.fetchUserBlogs(req, res, next)
      })
    )

    router.get(
      "/fetchSingleBlog",
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.fetchSingleBlog(req, res, next)
      })
    )

    router.post(
      "/fetchSimilarBlogs",
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.fetchSimilarBlogs(req, res, next)
      })
    )

    router.post(
      '/increaseReadCount',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.increaseReadCount(req, res, next)
      })
    )

    router.post(
      '/followUser',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.followUser(req, res, next)
      })
    )

    router.post(
      '/unfollowUser',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.unfollowUser(req, res, next)
      })
    )

    router.post(
      '/likeBlog',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.likeBlog(req, res, next)
      })
    )

    router.post(
      '/unlikeBlog',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.unLikeBlog(req, res, next)
      })
    )

    router.get(
      '/initialLike',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.initialLike(req, res, next)
      })
    )

    router.post(
      '/saveBlog',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.saveBlog(req, res, next)
      })
    )

    router.post(
      '/unSaveBlog',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.unSaveBlog(req, res, next)
      })
    )

    router.get(
      '/savedBlogs',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.savedBlogs(req, res, next)
      })
    )

    router.get(
      '/listFollowers',
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        userController.listFollowers(req, res, next)
      })
    )

  return router;
}
