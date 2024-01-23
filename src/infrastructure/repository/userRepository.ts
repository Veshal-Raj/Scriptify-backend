import User from "../../domain/user";
import { UserModel } from "../database/userModel";
import UserRepository from "../../use_case/interface/userController";

class userRepository implements UserRepository {
    async save(user: User) {
        const newUser = new UserModel(user)
        await     
    }
}