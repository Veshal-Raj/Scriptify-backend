import bcrypt from 'bcryptjs'
import {IHashpassword} from '../../usecasesLayer/interface/services/hashPassword'

class Encrypt implements IHashpassword {

  constructor(){}

  async createHash(password: string): Promise<string> {
    console.log('reached inside the createHash function infra/services/hashedPassword')
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(password,salt)
    console.log("hashPassword", hashPassword)
    return hashPassword

  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    console.log('reached inside the comparePassword function infra/services/hashedPassword')
     const passwordMatch=await bcrypt.compare(password,hashPassword)
     console.log('passwordMatch', passwordMatch)
        return passwordMatch
  }

}

export default Encrypt