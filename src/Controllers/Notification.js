import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const notificationRoot = document.getElementById('notification-root');

/**
 * @param {string} text Text of the notification
 */
export class Notification extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        notificationRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        notificationRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

ReactDOM.render(<Notification />, notificationRoot);
