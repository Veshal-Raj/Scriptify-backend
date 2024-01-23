import User from "../../domain/user";

interface userInterface{
    saveUser(user:User):Promise<any>
    findByEmail(email:string): Promise<any>
}

export default userInterface