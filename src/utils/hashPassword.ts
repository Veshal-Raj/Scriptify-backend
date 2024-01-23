import bcrypt from "bcryptjs";
import Hashpassword from "../use_case/interface/hashPasswordInterface";


class Encrypt implements Hashpassword {
  async createHash(password: string): Promise<string> {
    try {
      console.log("reached inside utils/hashPassword/Encrypt");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword inside utils/hashpassword", hashedPassword);
      return hashedPassword;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      return passwordMatch;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default Encrypt;
