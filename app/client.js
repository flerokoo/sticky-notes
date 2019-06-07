import "normalize.css";
import "./styles/index.scss";
import ReactDOM from "react-dom";
import React from 'react';
import App from './components/main';
import { BrowserRouter } from 'react-router-dom';
import Main from "./components/main";
import configureStore from "./reducers/configure-store";
import { Provider } from 'react-redux';

let preloadedState = {};

try {
    preloadedState = JSON.parse(window.__REDUX_STATE__)
} catch (e) {
    // TODO add logging
}

const root = document.getElementsByClassName("app")[0]
let store = configureStore(preloadedState);
let composition = (
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>
);

let isFirstRender = true;

isFirstRender && false
    ? ReactDOM.hydrate(composition, root)
    : ReactDOM.render(composition, root)

isFirstRender = false;

