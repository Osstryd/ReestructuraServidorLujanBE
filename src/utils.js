import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import MongoStore from 'connect-mongo';
import { connectionString } from './daos/mongodb/connection.js'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false,
}

//registro
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
};

//login
export const isValidPass = (password, user) => {
    return compareSync(password, user.password);
};

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
};