import { Next, Req, Res, } from "../infrastructureLayer/types/serverPackageTypes";
import { IAdminUseCase } from "../usecasesLayer/interface/usecase/adminUseCase";

export class AdminController {
  private readonly adminUseCase: IAdminUseCase;

  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  async getAllUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getAllUser(next);
      return res
        .status(200)
        .json({
          success: true,
          message: "users have been fetched successfully",
          data: result,
        });
    } catch (error) {
      throw error;
    }
  }

  async changeUserStatus(req: Req, res: Res, next: Next) {
    try {
      const userId = req.params.id;
      const result = await this.adminUseCase.changeUserStatus(userId, next);
      return res
        .status(200)
        .json({
          success: true,
          message: "user status changed successfully",
          data: result,
        });
    } catch (error) {
      throw error;
    }
  }

  async getAllBlogs(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getAllBlogs(next);
      return res
        .status(200)
        .json({
          success: true,
          message: "all blogs fetched successfully",
          data: result,
        });
    } catch (error) {
      throw error;
    }
  }

  async changeBlogStatus(req: Req, res: Res, next: Next) {
    try {
      const blogId = req.body.blogId;
      const result = await this.adminUseCase.changeBlogStatus(blogId, next);
      return res
        .status(200)
        .json({
          success: true,
          message: "Blog status changed successfully",
          data: result,
        });
    } catch (error) {
      throw error;
    }
  }

  async getAllReports(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getAllReports(next);
      return res
        .status(200)
        .json({
          success: true,
          message: "all reports fetched successfully",
          data: result,
        });
    } catch (error) {
      throw error;
    }
  }

  async getUserSubscribedData (req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getUserSubscribedData(next)
      return res
        .status(200)
        .json({
          success: true,
          message: "user subscribed data",
          data: result,
        });
    } catch (error) {
      throw error
    }
  }

  async getTotalBlogData(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getTotalBlogData(next)
      return res
        .status(200)
        .json({
          success: true,
          message: "user subscribed data",
          data: result,
        });
    } catch (error) {
      throw error
    }

  }
}
