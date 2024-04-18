import { firebaseAuthentication } from "../../../../../services/firebaseAuthentication"
import UserModel from "../../../models/userModel"



export const googleAuth = async (uid: string) => {
    try{
        const result = await firebaseAuthentication(uid)
        // console.log('------ ',result)
        if (!result.uid) {
            // throw new Error("User doesn't exist.")
            return { message: "User doesn't exist."}
        } else {
            // console.log(result.uid)
            console.log(result.email)
            console.log(result.displayName)
            console.log(result.photoURL)
            const email = result.email;
            const displayName = result.displayName;
            const photoURL = result.photoURL;
            const randomPassword = 'kdjkj#@32lkjd$$3'+ Math.random()*10 + 'dkjfj@@2';

           
            
            let user = await UserModel.findOne({ 'personal_info.email': email });
            if (user) {
                user.personal_info.password = '';
                console.log(user)
                if (!user.isVerified) {
                    console.log(user.isVerified)
                    console.log(!user.isVerified)
                    return { message: "User is not verified." }}
                else return user
            }
             
            else {
                user = new UserModel({
                    personal_info: {
                        email: email,
                        username: displayName,
                        profile_img: photoURL,
                        password: randomPassword
                    }
                })
                await user.save();
            }
            user.personal_info.password = '';

            console.log(user)
            return user
        }

    } catch (error) {
        throw error
    }
}