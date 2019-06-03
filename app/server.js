import config from "./config/server-config";
import express from "express";
import webRouter from './routes/web-router';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';

const app = express();    

app.use(helmet());

app.use(session({
    secret: config.sessionSecret,
    name: config.sessionId
}))

app.use(compression());

app.use("/s", express.static("public"));

app.use("/", webRouter);

app.listen(config.port, () => {
    console.log(`Started app at port ${config.port}`);
});



