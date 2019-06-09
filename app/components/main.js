import React from 'react';
import { StaticRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Sidebar from './sidebar';
import Settings from './settings';
import Wall from './wall';
import Header from './header';
import { Provider } from 'react-redux';
import SidebarActions from '../reducers/sidebar-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './login';
import Register from './register';
import UserActions from '../reducers/user-actions';

class Main extends React.Component {
    render() {
        
        let strippedPage = /(login|register)/i.test(this.props.history.location.pathname);
     
        return (
            <div className="wrapper">
                
                {!strippedPage && <Header toggleSidebar={this.props.toggleSidebar} />}
                
                {!strippedPage && <Sidebar open={this.props.sidebarOpen} />}
                    
                <Switch>
                    <Route exact path="/" component={Wall} />

                    <Route exact path="/login"
                        render={props => <Login {...props}
                            requestLogin={this.props.requestLogin}
                            userLoggedIn={this.props.user.loggedIn} />} />
                    
                    <Route exact path="/register" render={props => <Register {...props}
                        userLoggedIn={this.props.user.loggedIn}/>} />

                    <Route path="/settings" component={Settings} />  
                </Switch>
            </div>
        )
    }
}



let stateToProps = state => ({
    sidebarOpen: state.sidebar.open,
    user: state.user
});

let dispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch({ type: SidebarActions.TOGGLE }),
    requestLogin: (username, password) => dispatch({type: UserActions.REQUEST_LOGIN, payload: {username, password}})
})

export default withRouter(connect(stateToProps, dispatchToProps)(Main))
