import ejs from 'ejs';
import { readFileSync } from 'fs';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Main from '../components/main';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../reducers/configure-store';


let template = readFileSync("templates/index.ejs").toString();
let compiled = ejs.compile(template);

export default function configureWebRouter(router) {
    router.get("/*", (req, res) => {
        let context = {};
        let store = configureStore();
        let react = ReactDOM.renderToString((
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Main />
                </StaticRouter>
            </Provider>
        ));

        if (context.url) {
            res.writeHead(301, {
                Location: context.url
            });
            res.end();
        } else {
            let water = compiled({
                react,
                redux: store.getState(),
                title: "Some title"
            })

            res.send(water);
        }
    });

    return router;
}