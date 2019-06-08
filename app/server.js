import config from "./config/server-config";
import express from "express";
import webRouter from './routes/web-router';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import mongoose from "mongoose";
import connectToMongo from "./models/db";
import configureWebRouter from "./routes/web-router";
import configureApiRouter from "./routes/api-router";
import { createNoteModel } from "./models/note";
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import './auth/init';
import { createUserModel } from "./models/user";
import configurePassport from "./auth/init";
import cookieParser from 'cookie-parser';
let configureApp = dbconn => {

    
    const app = express();
    
    app.use(helmet());
    
    app.use(cookieParser(config.sessionSecret));

    let MongoStore = connectMongo(session);
    app.use(session({
        secret: config.sessionSecret,
        name: config.sessionId,
        saveUninitialized: false,
        resave: true,
        rolling: true,
        cookie: {
            maxAge: 10 * 60 * 1000,
            httpOnly: true
        },
        store: new MongoStore({
            mongooseConnection: dbconn
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.use(compression());

    app.use("/s", express.static("public"));
    app.use("/api", configureApiRouter(express.Router(), dbconn));
    app.use("/", configureWebRouter(express.Router(), dbconn));

    app.listen(config.port, () => {
        console.log(`App listening at port ${config.port}`);
    });
}

connectToMongo().then(dbconn => {
    createNoteModel(dbconn);
    createUserModel(dbconn);
    configurePassport(dbconn)
    configureApp(dbconn);
})



