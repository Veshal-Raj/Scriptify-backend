import IUser from "../../entitiesLayer/user";
import { Next } from "../../infrastructureLayer/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IAdminUseCase } from "../interface/usecase/adminUseCase";
import { ErrorHandler } from "../middlewares/errorHandler";
import CustomLogger from "../../infrastructureLayer/services/errorLogging";
import { getAllUser } from "./admin/getAllUser";

export class AdminUseCase implements IAdminUseCase {
  private readonly userRepository: IUserRepository;
  private readonly logger: CustomLogger;

  constructor(userRepository: IUserRepository, logger: CustomLogger) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async getAllUser(next: Next): Promise<void | IUser[]> {
    try {
      return await getAllUser(this.userRepository, next, this.logger);
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
