import IUser from "../../entitiesLayer/user";
import { Next, Req } from "../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IAdminUseCase } from "../interface/usecase/adminUseCase";
import { ErrorHandler } from "../middlewares/errorHandler";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";
import { IUserResponse } from "../interface/request_response/user";
import { getAllUser, changeUserStatus } from "./admin/index";
import { getAllBlogs } from "./admin/getAllBlogs";
import { changeBlogStatus } from "./admin/changeBlogStatus";
import { IAdminRepository } from "../interface/repository/IadminRepository";
import { getAllReports } from "./admin/getAllReports";

export class AdminUseCase implements IAdminUseCase {
  private readonly adminRepository: IAdminRepository;
  private readonly logger: CustomLogger;

  constructor(adminRepository: IAdminRepository, logger: CustomLogger) {
    this.adminRepository = adminRepository;
    this.logger = logger;
  }

  async getAllUser(next: Next): Promise<void | IUser[]> {
    try {
      return await getAllUser(this.adminRepository, next, this.logger);
    } catch (error) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

 async changeUserStatus(req: Req, next: Next): Promise<IUserResponse | void> {
    try {
      console.log(req.params.id, 'in usercases adminUsecase')
      return await changeUserStatus(this.adminRepository, req, next, this.logger)
    } catch (error) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async getAllBlogs(next: Next): Promise<any> {
    try {
        const response = await getAllBlogs(next, this.adminRepository,  this.logger)
        return response
    } catch (error) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async changeBlogStatus(blogId: string, next: Next): Promise<any> {
    try {
        const response = await changeBlogStatus(blogId, next, this.adminRepository, this.logger)
        return response
    } catch (error) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }

  async getAllReports(next: Next): Promise<any> {
    try {
      const response = await getAllReports(next, this.adminRepository, this.logger)
      return response
    } catch (error) {
      return next(
        new ErrorHandler(
          500,
          error instanceof Error ? error.message : "Unknown error",
          this.logger
        )
      );
    }
  }
}
