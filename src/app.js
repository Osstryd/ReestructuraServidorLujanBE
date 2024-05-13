import './daos/mongodb/connection.js'
import express from 'express'
import { __dirname, mongoStoreOptions } from './utils.js'
import { errorHandler } from './middlewares/errorHandler.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import session from 'express-session';
import passport from 'passport';
import cookieParser from "cookie-parser";
import router from '../src/routes/index.router.js'
import './passport/strategies.js'
import './passport/github-strategy.js'
import './passport/google-strategy.js'
import './passport/jwt.js'
import 'dotenv/config'


const app = express()

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(errorHandler)
    .use(express.static(__dirname + '/public'))
    .use(session(mongoStoreOptions))
    .use(passport.initialize())
    .use(passport.session())
    .engine('handlebars', handlebars.engine())
    .set('views', __dirname + '/views')
    .set('view engine', 'handlebars')
    .use('', router)

const PORT = process.env.PORT

const httpServer = app.listen(PORT, () => console.log(`Server OK on port ${PORT}`))

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('New connection', socket.id)

    socket.on('disconnect', () => {
        console.log('¡User disconnect!', socket.id);
    })
})