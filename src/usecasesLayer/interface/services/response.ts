import {IUser} from '../../../entitiesLayer/user'

export interface Response {
    user?: IUser;
    success: boolean;
    status: number;
    message?: string;

}