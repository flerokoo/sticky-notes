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

    toggle() {        
        this.setState({
            ...this.state,
            active: !this.state.active
        })
    }

    render() {
        return (
            <div className={ "sidebar " + (this.state.active ? "sidebar--active" : "") }>
                <SettingsLink to="/">Home</SettingsLink>
                <SettingsLink to="/settings">Settings</SettingsLink>
                <button onClick={this.toggle.bind(this)} >some</button>
            </div>
        )
    }
}