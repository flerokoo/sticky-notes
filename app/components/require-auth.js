import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function requireAuth(Component) {
    class AuthComponent extends React.Component {
        render() {
            if (this.props.userLoggedIn) {
                return (<Component {...this.props}/>)
            } else if(this.props.userLoggingIn) {
                return (<div>Loading</div>)
            } else {
                return (<Redirect to="/login"/>)
            }
        }
    }

    let mapStateToProps = state => ({
        userLoggedIn: state.user.loggedIn,
        userLoggingIn: state.user.loggingIn
    })

    return withRouter(connect(mapStateToProps, null)(AuthComponent))
}