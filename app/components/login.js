import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FullscreenForm from './fullscreen-form';

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
            <FullscreenForm title="Sign in">
                <form method="post" action="/login">
                    {/* <label>Login</label> */}
                    <input ref={this.loginRef} type="text" placeholder="Username" name="username" defaultValue="emile"/>
                    {/* <label>Password</label> */}
                    <input ref={this.passwordRef} type="password" placeholder="Password" name="password" defaultValue="password"/>                      
                    <input type="button" onClick={this.requestLogin.bind(this)} value="Go!" />
                </form>   
                <Link to="/register">Registration</Link> 
                <Link to="/">To wall</Link> 
                <Link to="/settings">To settings</Link>
            </FullscreenForm>    
        )
    }
}

export default withRouter(Login)