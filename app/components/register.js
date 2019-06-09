import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Register extends React.Component {

    render() {
        
        if (this.props.userLoggedIn) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <form method="post" action="/register">
                <input type="text" name="username" defaultValue="emile"/>
                <input type="password" name="password" defaultValue="password"/>         
                <input type="submit" value="Submit" />   
                <Link to="/login">to login page</Link>
            </form>
            
        )
    }
}