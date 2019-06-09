import ejs from 'ejs';
import { readFileSync, read } from 'fs';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Main from '../components/main';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../reducers/configure-store';
import passport from 'passport';
import { LoginStatus } from '../constants';
import UserActions from '../reducers/user-actions';
import joi from 'joi';
import { reduxStateSchema } from '../reducers/redux-state-schema';

let indexTemplate = readFileSync("templates/index.ejs").toString();
let formTemplate = readFileSync("templates/form.ejs").toString();
let compiledIndex = ejs.compile(indexTemplate);
let compiledForm = ejs.compile(formTemplate);

export default function configureWebRouter(router, dbconn) {

    let User = dbconn.model("User")

    router.post("/register", (req, res, next) => {
        // TODO validate everything

        let { username, password } = req.body;

        let user = new User({ name: username })
        user.setPassword(password)
        user.save()
            .then(() => res.redirect("/").end())
            .catch(next)

    })

    router.get("/login", (req, res, next) => req.isAuthenticated() ? res.redirect("/") : next())

    router.post("/login", (req, res, next) => {

        passport.authenticate('basic', (err, user, info) => {            
            if (err) {
                return next(err);
            }
           
            if (!user) {                
                return res.json(info);
            }

            // req.logIn(user, () => res.redirect("/"));
            req.logIn(user, err => {

                if (err) {
                    return res.json({
                        error: err
                    });
                }

                res.json({
                    username: user.name,
                    status: LoginStatus.SUCCESS
                })
            })

        })(req, res, next)
    })

    router.all("/logout", (req, res) => {
        req.logout();
        res.redirect("/login")
    })

    let responseWithReact = (req, res, next) => {
        let context = {};
        let store = configureStore();        

        if (req.user) {
            store.dispatch({
                type: UserActions.LOGIN_SUCCESS, payload: {
                    username: req.user.name
                }
            })
        }

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
            let storeState = store.getState();
            let { error, validatedStoreState } = joi.validate(storeState, reduxStateSchema);

            if (error) {
                return next(error);
            }

            let water = compiledIndex({
                react,
                redux: validatedStoreState,                
                title: "Some title"
            })

            res.send(water);
        }
    }

    let checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/login");
    
    router.get(/(login|register)/i, responseWithReact)

    router.get("/*", checkAuth, responseWithReact)
    

    return router;
}