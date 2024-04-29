import IUser from "../../entitiesLayer/user";
import { Next } from "../../infrastructureLayer/types/serverPackageTypes";
import { IAdminUseCase } from "../interface/usecase/adminUseCase";
import { ErrorHandler } from "../middlewares/errorHandler";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";
import { IUserResponse } from "../interface/request_response/user";
import { getAllUser, changeUserStatus, getAllBlogs, changeBlogStatus, getAllReports, getUserSubscribedData, getTotalBlogData } from "./admin/index";
import { IAdminRepository } from "../interface/repository/IadminRepository";

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

 async changeUserStatus(userId: string, next: Next): Promise<IUserResponse | void | IUser | null> {
    try {      
      return await changeUserStatus(this.adminRepository, userId, next, this.logger)
    } catch (error) {
      return next(
        new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)
      );
    }
  }

  async getAllBlogs(next: Next): Promise<any> {
    try {
        return await getAllBlogs(next, this.adminRepository,  this.logger)        
    } catch (error) {
      return next(
        new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)
      );
    }
  }

  async changeBlogStatus(blogId: string, next: Next): Promise<any> {
    try {
        return await changeBlogStatus(blogId, next, this.adminRepository, this.logger)        
    } catch (error) {
      return next(
        new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger)
      );
    }
  }

  async getAllReports(next: Next): Promise<any> {
    try {
      return await getAllReports(next, this.adminRepository, this.logger)
    } catch (error) {
      return next(
        new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger )
      );
    }
  }

  async  getUserSubscribedData(next: Next): Promise<any> {
    try {
      return await getUserSubscribedData(next, this.adminRepository, this.logger)
    } catch (error) {
      return next(
        new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger )
      );
    }
  }

  async getTotalBlogData(next: Next): Promise<any> {
    try {
      return await getTotalBlogData(next, this.adminRepository, this.logger)
    } catch (error) {
      return next(
        new ErrorHandler(500, error instanceof Error ? error.message : "Unknown error", this.logger )
      );
    }
  }
}