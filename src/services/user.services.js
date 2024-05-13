import Services from "./class.services.js";
import UserDaoMongo from "../daos/mongodb/user.dao.js";
import { generateToken } from '../jwt/auth.js';


const userDao = new UserDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  async register(user) {
    try {
      return await userDao.register(user)
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const userExist = await userDao.login(user)
      if (userExist) return generateToken(userExist)
      else return false
    } catch (error) {
      console.log(error);
    }
  }

}
