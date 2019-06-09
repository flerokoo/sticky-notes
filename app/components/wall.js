import React, { Component } from 'react';
import requireAuth from './require-auth';

class Wall extends Component {
    render() {
        return (
            <div className="page wall-page">
                wall
            </div>
        )
    }
}

export default requireAuth(Wall)