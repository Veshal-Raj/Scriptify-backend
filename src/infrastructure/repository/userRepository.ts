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
    async emailExistCheck(Email: string): Promise<any> {
        console.log('repository --> ',Email)
        const userFound = await UserModel.find({Email})
        console.log('userFound', userFound)
        if (!userFound) {
            console.log("first")
            return null
        }
        return userFound;    
    }

    async findByEmail(Email: string) {
        try {
            const user = await UserModel.findOne({ Email: Email })
            console.log('inside userRepository findEmail --> ', user)
            if (user) {
                return user

            } else {
                return null

            }
        } catch (error) {
            throw error
        }
    }

}

export default userRepository