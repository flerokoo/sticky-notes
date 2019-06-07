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

class Main extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header toggleSidebar={this.props.toggleSidebar}/>
                <Sidebar open={this.props.sidebarOpen}/>
                <Switch>
                    <Route exact path="/" component={Wall} />
                    <Route path="/settings" component={Settings} />  
                </Switch>
            </div>
        )
    }
}



let stateToProps = state => ({sidebarOpen: state.sidebar});

let dispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch({ type: SidebarActions.TOGGLE })
})

export default withRouter(connect(stateToProps, dispatchToProps)(Main))
