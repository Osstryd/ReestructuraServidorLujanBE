import Controllers from './class.controller.js';
import UserService from '../services/user.services.js';
import { createResponse } from "../utils.js";

const userService = new UserService();

export default class UserControllers extends Controllers {
    constructor() {
        super(userService)
    }

    async register(req, res, next) {
        try {
            const newUser = await userService.register(req.body);
            if (!newUser) createResponse(res, 404, 'User already exists');
            else createResponse(res, 200, newUser)
        } catch (error) {
            next(error.message)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.login({ email, password });
            if (!user) {
                res.json({ msg: 'invalid credentials' });
            } else {
                res
                    .cookie('token', user, { httpOnly: true })
                    .json({ msg: 'Login OK', user })
            }
        } catch (error) {
            next(error);
        }
    }
}
