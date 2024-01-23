import User  from "../domain/user";
import userRepository from "../infrastructure/repository/userRepository";
import Encrypt from "../utils/hashPassword";

class  Userusecase {
    private userRepository: userRepository
    private Encrypt: Encrypt

    constructor(userRepository: userRepository, Encrypt: Encrypt) {
        this.userRepository = userRepository
        this.Encrypt = Encrypt
    }

    // saving user to database
    async saveUser(user: User) {
        try {
            console.log('reached inside the usecase ---> usecase')
            console.log('checking user', user)
            const hashedPassword = await this.Encrypt.createHash(user.Password)
            console.log('hashedPassword --> ', hashedPassword)
            user.Password = hashedPassword;
            console.log(user)

            const userSave = this.userRepository.saveUser(user)
            console.log('saveUser inside userusecase --> ', userSave)
            return {
                status: 200,
                data: userSave  
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }

    // checking email exist
    async emailExistCheck(Email: string) {
        try {
            console.log('inside the userusecase emailexitcheck',Email)
            const userFound = await this.userRepository.findByEmail(Email)
            console.log('userFound inside useCase', userFound)
            return userFound
            // if (userFound) {

            //     return userFound
            // } else {
            //     return null
                
            // }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }

    
}

export default Userusecase;