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
    
  return router;
}
