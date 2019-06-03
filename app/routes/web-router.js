import ejs from 'ejs';
import { readFileSync } from 'fs';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Main from '../components/main';
import { StaticRouter } from 'react-router-dom';

let router = express.Router();
let template = readFileSync("templates/index.ejs").toString();
let compiled = ejs.compile(template);

router.get("/*", (req, res) => {
    let context = {};

    let react = ReactDOM.renderToString((
        <StaticRouter location={req.url} context={context}>
            <Main/>
        </StaticRouter>
    ));

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        let water = compiled({
            react, title: "Some title"
        })

        res.send(water);
    }    
});


export default router;