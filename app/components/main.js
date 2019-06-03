import React from 'react';
import { StaticRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Sidebar from './sidebar';
import Settings from './settings';
import Wall from './wall';

export default class Main extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Wall} />
                    <Route path="/settings" component={Settings} />  
                </Switch>
            </div>
        )
    }
}
