import React, { Component } from 'react';

/**
 * @param {string} name Name of the button and key
 */
export class Button extends Component {
    render() {
        return (
            <button className="button" key={this.props.name}>{this.props.name}</button>
        )
    }
}

