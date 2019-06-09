import React from 'react';
import requireAuth from './require-auth';

class Settings extends React.Component {
    render() {
        return (
            <div className="page settings-page">
                settings
            </div>
        )
    }
}

export default requireAuth(Settings)