import { createHash, isValidPass } from '../../utils.js';
import { UserModel } from './models/user.models.js'
import MongoDao from "./mongo.dao.js";

export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(UserModel)
    }

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if (!existUser) {
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    const newUser = await this.model.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin'
                    });
                    return newUser;
                }
                const newUser = await this.model.create({
                    ...user,
                    password: createHash(password),
                });
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const passValid = isValidPass(password, userExist)
                if (!passValid) return false
                else return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({ email });
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

}