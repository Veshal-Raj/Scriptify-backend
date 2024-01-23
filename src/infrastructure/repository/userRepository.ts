import User from "../../domain/user";
import UserModel from "../database/userModel";
import userInterface from "../../use_case/interface/userInterface";


class userRepository implements userInterface{
    
    // saving user to database
    async saveUser(user: User) {
        try {
            console.log(user,"--------------------")
            console.log('reached inside the repository --> infrastructure/repository')
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            // Handle the error here
            console.error("Error saving user:", error);
            throw new Error("Failed to save user"); 
        }
    }


    // check whether email  exist or not
    async findByEmail(Email: string) {
        try {
            const user = await UserModel.findOne({ Email: Email })
            console.log('inside userRepository findEmail --> ', user)
            return user
            // if (user) return user
            // else return null
        } catch (error) {
            throw error
        }
    }

}

export default userRepository