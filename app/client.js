import "normalize.css";
import "./styles/index.scss";
import ReactDOM from "react-dom";
import React from 'react';
import App from './components/main';
import { BrowserRouter } from 'react-router-dom';
import Main from "./components/main";

const root = document.getElementsByClassName("app")[0]


let isFirstRender = true;
isFirstRender && false
    ? ReactDOM.hydrate(<BrowserRouter><Main/></BrowserRouter>, root)
    : ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>, root)
isFirstRender = false;

