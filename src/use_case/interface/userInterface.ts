import User from "../../domain/user";

interface userInterface{
    saveUser(user:User):Promise<any>
    emailExistCheck(email:string): Promise<any>
}

export default userInterface