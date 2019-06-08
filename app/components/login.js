import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {

    onClick() {
        this.props.history.push("/")
    }

    render() {
        
        return (
            <form method="post" action="/login">
                <input type="text" name="username" defaultValue="emile"/>
                <input type="password" name="password" defaultValue="password"/>         
                <input type="submit" value="Submit" />   
                <Link to="/">to protected page</Link>
                <Link to="/register">Registration</Link>
                <button onClick={this.onClick.bind(this)} >Some button</button>
            </form>
            
        )
    }
}

export default withRouter(Login)