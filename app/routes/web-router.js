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

let indexTemplate = readFileSync("templates/index.ejs").toString();
let formTemplate = readFileSync("templates/form.ejs").toString();
let compiledIndex = ejs.compile(indexTemplate);
let compiledForm = ejs.compile(formTemplate);

export default function configureWebRouter(router, dbconn) {

    let User = dbconn.model("User")

    router.post("/register", (req, res) => {
        // TODO validate everything

        let { username, password } = req.body;

        let user = new User({ name: username })
        user.setPassword(password)
        user.save()
            .then(() => res.redirect("/").end())
            .catch(() => res.status(500).end())

    })

    router.post("/login", (req, res, next) => {
        passport.authenticate('basic', (err, user, info) => {            
            if (err) {
                return res.status(500).end()
            }

            if (!user) {                
                return res.redirect("/login")
            }

            req.logIn(user, () => res.redirect("/"))

            // res.redirect("/");
            console.log("posted to /login")

            
        })(req, res, next)
    })

    router.all("/logout", (req, res) => {
        req.logout();
        res.redirect("/login")
    })

    let responseWithReact = (req, res) => {
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
            let water = compiledIndex({
                react,
                redux: {
                    ...store.getState(),
                    user: !req.user ? undefined : {
                        name: req.user.name
                    }
                },
                title: "Some title"
            })

            res.send(water);
        }
    }
    
    router.get(/(login|register)/i, responseWithReact)
    // router.get("/*", (req, res, next) => {
    //     console.log("START")
    //     passport.authenticate("basic", (err, user, info) => {
    //         console.log(err, user, info)
    //         if (err) {
    //             return res.status(500).end();
    //         }

    //         console.log(req.cookies)

    //         if (!user) {
    //             return res.redirect("/login");
    //         }

    //         res.redirect("/")
    //     })(req, res, next)

    //     // console.log(req.isAuthenticated())
    // });
    // let checkAuth = (req, res, next) => {
    //     passport.authenticate("basic", (err, user, info) => {
          
    //         if (err) {
    //             return res.status(500).end();
    //         }

    //         if (!user) {
    //             console.log("redirecting to /login from " + req.url)
    //             return res.redirect("/login");
    //         }

    //         req.logIn(user, () => next())

    //     })(req, res, next)
    // }

    let checkAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/login")

    router.get("/*", checkAuth, responseWithReact)
    

    return router;
}