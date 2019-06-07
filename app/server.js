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

let configureApp = dbconn => {
    const app = express();

    app.use(helmet());

    app.use(session({
        secret: config.sessionSecret,
        name: config.sessionId
    }))

    app.use(bodyParser())

    app.use(compression());
    app.use("/s", express.static("public"));
    app.use("/api", configureApiRouter(express.Router(), dbconn));
    app.use("/", configureWebRouter(express.Router()));

    app.listen(config.port, () => {
        console.log(`App listening at port ${config.port}`);
    });
}

connectToMongo().then(dbconn => {
    createNoteModel(dbconn);
    configureApp(dbconn);
})



