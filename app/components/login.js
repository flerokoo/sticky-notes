import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }


    requestLogin() {
        if (!this.props.requestLogin) {
            throw new Error("Login component: requestLogin field mandatory");           
        }
        this.props.requestLogin(this.loginRef.current.value, this.passwordRef.current.value);
    }

    render() {

        if (this.props.userLoggedIn) {
            return (
                <Redirect to="/"/>
            )
        }
        
        return (
            <form method="post" action="/login">
                <input ref={this.loginRef} type="text" name="username" defaultValue="emile"/>
                <input ref={this.passwordRef} type="password" name="password" defaultValue="password"/>  
                <Link to="/register">Registration</Link>
                <Link to="/">To wall</Link>
                <Link to="/settings">To settings</Link>
                <a onClick={this.requestLogin.bind(this)} >Login ajax</a>
                <input type="submit" value="Submit http"/>
            </form>            
        )
    }
}

export default withRouter(Login)