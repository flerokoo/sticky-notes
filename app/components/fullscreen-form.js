import React from 'react';


export default class FullscreenForm extends React.Component {
    render() {
        return (
            <div className="fullscreen-form">
                <div className="fullscreen-form__inner">
                    <h1>{this.props.title || "Form"}</h1>
                    <div className="fullscreen-form__form-container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }    
}