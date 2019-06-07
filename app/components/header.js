import React from 'react';
import { connect } from 'react-redux'
import SidebarActions from '../reducers/sidebar-actions';

export default class Header extends React.Component {

    toggleSidebar() {

    }

    render() {
        console.log(this.props)
        return (
            <header>
                Header
                <button onClick={this.props.toggleSidebar}>some</button>
            </header>
        )
    }
}

