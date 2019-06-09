import React from 'react';
import { Link } from 'react-router-dom';

let SettingsLink = props => (<Link {...props}> {props.children} </ Link>)

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
    }


    render() {
        return (
            <div className={ "sidebar " + (this.props.open ? "sidebar--active" : "") }>
                <SettingsLink to="/">Home</SettingsLink>
                <SettingsLink to="/settings">Settings</SettingsLink>
                <SettingsLink to="/login">[Debug] Login</SettingsLink>
                <SettingsLink to="/register">[Debug] Register</SettingsLink>
                <a href="/logout">Log out</a>
                
            </div>
        )
    }
}