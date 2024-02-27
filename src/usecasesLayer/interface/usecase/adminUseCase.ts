import IUser from "../../../entitiesLayer/user";
import { Next } from "../../../infrastructureLayer/types/serverPackageTypes";


export interface IAdminUseCase {
    getAllUser(next: Next): Promise<IUser[] | void>
}